import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../../services/student.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EvaluationCard} from '../../shared/evaluation-card';
import {Student} from '../../shared/student';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';
import {take} from 'rxjs/operators';
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-evaluation-card',
  templateUrl: './evaluation-card.component.html',
  styleUrls: ['./evaluation-card.component.scss']
})
export class EvaluationCardComponent implements OnInit {
  card: EvaluationCard;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private studentService: StudentService,
              @Inject(MAT_DIALOG_DATA) public data: { stud: Student }) {

  }

  async ngOnInit() {
    this.card = await this.studentService.getJointEvaluation(this.data.stud.id)
      .pipe(take(1))
      .toPromise()
      .then(data => data);
    this.chartOptions = {
      series: [
        {
          name: 'Participation',
          data: [this.parse(this.card.feEvaluationDTO?.participation),
            this.parse(this.card.beEvaluationDTO?.participation),
            this.parse(this.card.qaEvaluationDTO?.participation)]
        },
        {
          name: 'Technical skills',
          data: [this.parse(this.card.feEvaluationDTO?.techSkills),
            this.parse(this.card.beEvaluationDTO?.techSkills),
            this.parse(this.card.qaEvaluationDTO?.techSkills)]
        },
        {
          name: 'Learning pace',
          data: [this.parse(this.card.feEvaluationDTO?.learningPace),
            this.parse(this.card.beEvaluationDTO?.learningPace),
            this.parse(this.card.qaEvaluationDTO?.learningPace)]
        },
        {
          name: 'Extra mile',
          data: [this.parse(this.card.feEvaluationDTO?.extraMile),
            this.parse(this.card.beEvaluationDTO?.extraMile),
            this.parse(this.card.qaEvaluationDTO?.extraMile)]
        },
        {
          name: 'Joint evaluation',
          data: [this.parse(this.card.feEvaluationDTO?.jointEvaluation),
            this.parse(this.card.beEvaluationDTO?.jointEvaluation),
            this.parse(this.card.qaEvaluationDTO?.jointEvaluation)]
        }
      ],
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          // endingShape: 'rounded'
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [
          'Front-end',
          'Back-end',
          'QA'
        ]
      },
      yaxis: {
        title: {
          text: 'Points'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter(val) {
            return val + ' / 5 points';
          }
        }
      }
    };
  }

  parse(value: number | undefined | null): number {
    if (value === null || value === undefined) { return 0; }
    return parseFloat(value.toFixed(1));
  }
}
