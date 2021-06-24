import { Component, OnInit } from '@angular/core';
import { Kpi } from '../../../../models/kpi';
import { ToastrService } from 'ngx-toastr';
import { GroupkpiService } from 'src/app/services/groupkpi.service';
import { NgForm } from '@angular/forms';
import { GroupKPI } from '../../../../models/groupKPI';
import { Router } from '@angular/router';
import { KpiService } from 'src/app/services/kpi.service';
import { TargetListKpi } from '../../../../models/targetList';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team';
@Component({
  selector: 'app-target-list',
  templateUrl: './target-list.component.html',
  styleUrls: ['./target-list.component.css'],
})
export class TargetListComponent implements OnInit {
  listKPI: Kpi[];
  listKpiFromGroupKpi: any;
  listTeam: Team[];
  listGroupKpi: GroupKPI[];
  listTargetKpi: TargetListKpi[];
  basicOptions: any;
  displayBasic: boolean = false;
  displayBasicUpdate: boolean = false;
  statuses: any[];
  loading: boolean = true;
  idgroupkpi: any;
  idGroup: number;
  activityValues: number[] = [0, 100];
  constructor(
    public service: KpiService,
    public groupkpiService: GroupkpiService,
    public teamService: TeamService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.service.getTarget().then((data) => (this.listTargetKpi = data));
    this.teamService.getTeam().then((data) => (this.listTeam = data));
    this.service
      .getGroupKpi()
      .then((dataGroupKpi) => (this.listGroupKpi = dataGroupKpi));
  }
  showBasicDialog() {
    this.displayBasic = true;
  }
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.listTargetKpi);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'products');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then((FileSaver) => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
      });
      FileSaver.saveAs(
        data,
        fileName + 'export' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }
  onSubmit(form: NgForm) {
    this.insert(form);
  }
  onSubmitUpdate(form1: NgForm) {
    this.update(form1);
  }
  reset(form: NgForm) {
    form.form.reset();
    this.service.formData = new Kpi();
  }
  displayUpdateForm(data: Kpi) {
    this.displayBasicUpdate = true;
    // this.service.formData = data;
    this.service.formData = Object.assign({}, data);
  }
  insert(form: NgForm) {
    this.service.post().subscribe(
      (res) => {
        this.reset(form);
        this.service.get().then((data) => (this.listKPI = data));
        this.toast.success('Thêm thành công!');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  update(form1: NgForm) {
    this.service.put().subscribe(
      (res) => {
        this.reset(form1);
        this.service.get().then((data) => (this.listKPI = data));
        this.toast.success('Sửa thành công!');
      },
      (err) => {
        console.log(err);
      }
    );
  }
  delete(id: number) {
    if (confirm('Bạn có muốn xóa dữ liệu không?')) {
      this.service.delete(id).subscribe((res) => {
        this.service.get().then((data) => (this.listKPI = data));
        this.toast.error('Thông báo', 'Xóa thành công');
      });
    }
  }
  getKpi(event) {
    this.service.getKpiFromGroupId(event.target.value).subscribe((res) => {
      this.listKpiFromGroupKpi = res;
    });
  }
  getEmployee(event) {}
}
