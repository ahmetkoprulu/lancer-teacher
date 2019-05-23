import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { ProposalService } from '../services/proposal.service';
import { Project } from '../models/project';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Proposal } from '../models/proposal';
import { UserService } from '../services/user.service';
import { ContractService } from '../services/contract.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
  providers: [ProjectService, ProposalService]
})
export class ProjectDetailComponent implements OnInit {
  project: Project;
  proposalForm: FormGroup;
  proposals: Proposal[];
  proposal: Proposal;
  selectedProposalId: number;
  isProjectOffered: boolean;

  // tslint:disable-next-line:max-line-length
  constructor(
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private proposalService: ProposalService,
    private contractService: ContractService,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.getProjectById(params['pId']);
      // tslint:disable-next-line:no-string-literal
      this.getProposalById(params['pId']);
    });

    this.createProposalForm();
  }

  confirmContract() {
    console.log('it works.' + this.selectedProposalId);
    this.contractService.createContract(this.project.id, this.selectedProposalId);
  }

  didInstructorOffered(): boolean {
    console.log(this.userService.getCurrentUserId());
    for (let proposal of this.proposals) {
      console.log(proposal.i_id);
      if (proposal.i_id === this.userService.getCurrentUserId()) {
        console.log('ok');
        return true;
      }
    }
    return false;
  }

  createProposalForm() {
    this.proposalForm = this.formBuilder.group({
        comment: ['', Validators.required],
        price: ['', Validators.required]
    });
  }

  postProposal() {
    console.log('basti abi');
    if (this.proposalForm.valid) {
      this.proposal = Object.assign({}, this.proposalForm.value);
      // TODO: GET INSTRUCTOR FROM TOKEN
      this.proposal.i_id = this.userService.getCurrentUserId();
      this.proposal.p_id = this.project.id;
      this.proposalService.creteProposal(this.proposal);
      this.proposal.name = this.userService.getCurrentUser().name;
      this.proposal.surname = this.userService.getCurrentUser().surname;
      this.proposals[this.proposals.length] = this.proposal;
    }
  }

  getProjectById(pId) {
    this.projectService.getProjectById(pId).subscribe(data => {
      this.project = data;
    });
  }

  getProposalById(pId) {
    this.proposalService.getProposalByProjectId(pId).subscribe(data => {
      this.proposals = data;
      this.isProjectOffered = this.didInstructorOffered();
      console.log(this.isProjectOffered);
    });

  }
}
