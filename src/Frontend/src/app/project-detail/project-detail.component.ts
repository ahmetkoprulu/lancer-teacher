import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProposalService } from '../services/proposal.service';
import { Project } from '../models/project';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Proposal } from '../models/proposal';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectService, ProposalService]
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  proposalForm: FormGroup;
  proposal: Proposal;
  // tslint:disable-next-line:max-line-length
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService, private proposalService: ProposalService, private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.getProjectById(params['pId']);
    });

    this.createProposalForm();
  }

  createProposalForm() {
    this.proposalForm = this.formBuilder.group({
        comment: ['', Validators.required],
        price: ['', Validators.required]
    });
  }

  postProposal() {
    if (this.proposalForm.valid) {
      this.proposal = Object.assign({}, this.proposalForm.value);
      // TODO: GET INSTRUCTOR FROM TOKEN
      this.proposal.iId = 1;
      this.proposal.pId = this.project.id;
      this.proposalService.creteProposal(this.proposal, this.project.id);
    }
  }

  getProjectById(pId) {
    this.projectService.getProjectById(pId).subscribe(data => {
      this.project = data;
    });

    this.proposalService.getProposalByProjectId(pId).subscribe(data => {
      this.project.proposals = data;
    });
  }
}
