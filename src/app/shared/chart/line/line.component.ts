import { Component, OnInit } from '@angular/core';
import { Team } from '../../../models/team';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from '../../../models/employee';
import { Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager.service';
import { ThongKeService } from 'src/app/services/thongke.service';
@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit {
  listEmployee: Employee[];
  listTeam: Team[];
  basicData: any;
  idteam: any;
  listTargetKpi: any;
  basicOptions: any;
  constructor(
    public service: ThongKeService,
    public managersv: ManagerService,
    private toast: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.service.get().then((data) => (this.listTargetKpi = data));
    this.service
      .getLineChart()
      .toPromise()
      .then(
        (data) => ((this.basicData.datasets[0].data = data), console.log(data))
      );
    this.service
      .getLineChart2()
      .toPromise()
      .then(
        (data) => (
          (this.basicData.datasets[1].data = data),
          console.log(this.basicData.datasets[1].data)
        )
      );
    this.basicData = {
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      datasets: [
        {
          label: 'Chỉ tiêu giao',
          backgroundColor: '#42A5F5',
        },
        {
          label: 'Chỉ tiêu thực hiện',
          backgroundColor: '#FFA726',
        },
      ],
    };
  }
}
