import {
  Component,
  OnInit,
  Directive,
  EventEmitter,
  Input,
  Output,
  QueryList,
  ViewChildren,
} from "@angular/core";
import { TableService } from "./ngtable.service";
import Validation from "../../form/form-validation/validation";
import {
  FormsModule,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormControl,
  AbstractControl,
} from "@angular/forms";
import {
  NgbModal,
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from "@ng-bootstrap/ng-bootstrap";
import { Table } from "./ngtable";
import {
  AsyncPipe,
  CommonModule,
  DecimalPipe,
  NgFor,
  NgIf,
} from "@angular/common";
import { FeatherModule } from "angular-feather";

export type SortColumn = keyof Table | "";

export type SortDirection = "asc" | "desc" | "";
const rotate: { [key: string]: SortDirection } = {
  asc: "desc",
  desc: "",
  "": "asc",
};
export const compare = (v1: number, v2: number): number => {
  if (v1 < v2) {
    return -1;
  } else if (v1 > v2) {
    return 1;
  } else {
    return 0;
  }
};
export interface SortEvent {
  column: string | null;
  direction: SortDirection;
}

@Directive({
  selector: "th[sortable]",
  standalone: true,
  host: {
    "[class.asc]": 'direction === "asc"',
    "[class.desc]": 'direction === "desc"',
    "(click)": "rotate()",
  },
})
export class NgbdSortableHeader {
  @Input() sortable: SortColumn = "";
  @Input() direction: SortDirection = "";
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

@Component({
  selector: "app-ngtable",
  standalone: true,
  imports: [
    NgFor,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbTypeaheadModule,
    NgbPaginationModule,
    NgIf,
    ReactiveFormsModule,
    CommonModule,
    FeatherModule,
    NgbModule,
    NgbdSortableHeader,
  ],
  templateUrl: "./ngtable.component.html",
  styleUrls: ["./ngtable.component.scss"],
})
export class TableComponent implements OnInit {
  // 2
  form: FormGroup = new FormGroup({
    fullname: new FormControl(""),
    username: new FormControl(""),
    email: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  clientList = this.tableService.getTable();
  sortClientList: Table[] | null = null;
  filterClient: Table[] | null = null;
  cfilterClient: Table[] | null = null;
  page = 1;
  pageSize = 2;
  editClient: UntypedFormGroup = Object.create(null);
  editAddLabel: string = "Edit";
  clientDetail: Table | null = null;
  totalLengthOfCollection: number = 0;

  //Sorting purpose...
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private tableService: TableService,
    private fb: UntypedFormBuilder,
    private modalService: NgbModal
  ) {
    this.filterClient = this.clientList;
    this.cfilterClient = this.clientList;
    this.sortClientList = this.clientList;
    this.totalLengthOfCollection = this.cfilterClient.length;
  }

  ngOnInit() {
    this.editClient = this.fb.group({
      fullName: ["", Validators.required],
      UserName: ["", Validators.required],
      email: ["", [Validators.email, Validators.required]],
    });

    this.form = new FormGroup(
      {
        fullname: new FormControl("", Validators.required),
        username: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ]),
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ]),
        confirmPassword: new FormControl("", Validators.required),
        acceptTerms: new FormControl(false, Validators.requiredTrue),
      },
      {
        validators: Validation.match("password", "confirmPassword"),
      }
    );
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = "";
      }
    });

    // sorting countries
    if (direction === "" || column === "") {
      this.sortClientList = this.tableService.getTable();
      this.cfilterClient = this.tableService.getTable();
    }
  }
  // // //}

  //Searching..........
  _searchTerm: string = "";
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(val: string) {
    this._searchTerm = val;
    this.filterClient = this.filter(val);
  }

  filter(v: string) {
    return this.tableService
      .getTable()
      .filter(
        (x) =>
          x.Name?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.UserName?.toLowerCase().indexOf(v.toLowerCase()) !== -1 ||
          x.Email?.toLowerCase().indexOf(v.toLowerCase()) !== -1
      );
  }

  //complete example................
  cpage = 1;
  cpageSize = 4;

  _csearchTerm: string = "";
  get csearchTerm(): string {
    return this._csearchTerm;
  }
  set csearchTerm(val: string) {
    this._csearchTerm = val;
    this.cfilterClient = this.filter(val);
    this.totalLengthOfCollection = this.cfilterClient.length;
  }

  ValidationMessage = {
    fullName: { required: "full Name is required." },
    UserName: { required: "User Name is required." },
    email: {
      required: "Email is required.",
      Email: "Not a email",
    },
  };

  formsErrors = {};

  openModal(targetModal: NgbModal, client: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: "static",
    });

    if (client == null) {
      this.editAddLabel = "Add";
    }

    if (client != null) {
      this.clientDetail = client;
      this.editAddLabel = "Edit";
      this.editClient.patchValue({
        fullName: client.Name,
        UserName: client.UserName,
        email: client.Email,
      });
    }
  }

  closeBtnClick() {
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  delete(id: number): void {
    this.cfilterClient = this.cfilterClient.filter(
      (client) => client.Id !== id
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));

    if (this.clientDetail != null) {
      const index = this.tableService.getTable().indexOf(this.clientDetail);

      this.clientDetail.Name = this.editClient?.get("fullName")?.value;
      this.clientDetail.UserName = this.editClient?.get("UserName")?.value;
      this.clientDetail.Email = this.editClient?.get("email")?.value;

      this.tableService.getTable()[index] = this.clientDetail;
    } else {
      this.clientDetail = new Table();

      this.clientDetail.Id =
        Math.max(
          ...this.tableService.getTable().map(function (o) {
            return o.Id;
          })
        ) + 1;

      this.clientDetail.Name = this.editClient?.get("fullName")?.value;
      this.clientDetail.UserName = this.editClient?.get("UserName")?.value;
      this.clientDetail.Email = this.editClient?.get("email")?.value;
      this.clientDetail.imagePath = "assets/image/user3.jpg";

      this.tableService.getTable().push(this.clientDetail);
    }
    this.modalService.dismissAll();
    this.clientDetail = null;
    this.ngOnInit();
  }
}
