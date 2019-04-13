import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProposalService } from '../services/proposal.service';
import { Project } from '../models/project';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectService, ProposalService]
})
export class ProjectDetailComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService, private proposalService: ProposalService) { }
  project: Project;
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.getProjectId(params.get('pId'));
    });
  }
  getProjectId(pId) {
    this.projectService.getProjectById(pId).subscribe(data => {
      this.project = data;
    });

    this.proposalService.getProposalByProjectId(pId).subscribe(data => {
      this.project.proposals = data;
    });
  }
}
