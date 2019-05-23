import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProjectService } from '../services/project.service';
import { ProposalService } from '../services/proposal.service';
import { Project } from '../models/project';
import { Proposal } from '../models/proposal';
import { User } from '../models/instructor';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbDate, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Rate } from '../models/rate';
import { RateService } from '../services/rate.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  activeProjects: Project[];
  pasiveProjects: Project[];
  activeProposals: Proposal[];

  projectForm: FormGroup;
  selectedProject: Project;
  project: Project;
  model: NgbDate;
  proposalForm: FormGroup;
  selectedProposal: Proposal;
  proposal: Proposal;
  profileForm: FormGroup;
  profile: User;
  rateForm: FormGroup;
  selectedContract: Project;
  rate: Rate;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private proposalService: ProposalService,
    private rateService: RateService,
    private formBuilder: FormBuilder,
    private rateConfig: NgbRatingConfig
    ) {
      this.rateConfig.max = 5;
    }

  ngOnInit() {
    this.createProfileForm();
    this.createProposalForm();
    this.createProjectForm();
    this.createRateForm();
    this.getContracts();
    this.getProposals();
    this.getProjects();
  }

  createProposalForm() {
    this.proposalForm = this.formBuilder.group({
        comment: ['', Validators.required],
        price: ['', Validators.required]
    });
  }

  selectProposal(proposal: Proposal) {
    this.selectedProposal = proposal;
    this.proposalForm.setValue({comment: proposal.comment, price: proposal.price});
  }

  postProposal() {
    console.log('basti abi');
    if (this.proposalForm.valid) {
      this.proposal = Object.assign({}, this.proposalForm.value);
      this.selectedProposal.comment = this.proposal.comment;
      this.selectedProposal.price = this.proposal.price;
      this.proposalService.updateProposal(this.selectedProposal.id, this.proposal.comment, this.proposal.price);
    }
  }

  deleteProposal() {
    console.log(this.selectedProposal.id);
    this.proposalService.deleteProposal(this.selectedProposal.id);
    let index = this.activeProposals.findIndex(p => p.id === this.selectedProposal.id);
    this.activeProposals.splice(index, 1);
  }

  createProjectForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      max_price: ['', Validators.required],
      min_price: ['', Validators.required],
      deadline: ['', Validators.required],
      t_id: ['', Validators.required]
    });
  }

  createRateForm() {
    this.rateForm = this.formBuilder.group({
      score: ['', Validators.required],
      comment: ['', Validators.required]
    });
  }

  selectRate(contract: Project) {
    this.selectedContract = contract;
    this.rateForm.setValue({score: contract.score, comment: contract.comment});
  }

  postRate() {
    console.log(this.selectedContract.c_id);
    if (this.selectedContract.comment) {
      this.rate = Object.assign({}, this.rateForm.value);
      this.rate.c_id = this.selectedContract.c_id;
      this.selectedContract.score = this.rate.score;
      this.selectedContract.comment = this.rate.comment;
      this.rateService.updateRate(this.rate);
    } else {
      this.rate = Object.assign({}, this.rateForm.value);
      this.rate.c_id = this.selectedContract.c_id;
      this.selectedContract.score = this.rate.score;
      this.selectedContract.comment = this.rate.comment;
      this.rateService.createRate(this.rate);
    }
  }

  selectProject(project: Project) {
    this.selectedProject = project;
    this.projectForm.setValue({title: project.title, description: project.description, deadline: project.deadline,
      max_price: project.max_price, min_price: project.min_price, t_id: project.t_id});
    this.model = new NgbDate(+project.deadline.split('-')[0],
                  +project.deadline.split('-')[1],
                  +project.deadline.split('-')[2]);
  }

  postProject() {
    if (this.projectForm.valid) {
      this.project = Object.assign({}, this.projectForm.value);
      // tslint:disable-next-line:no-string-literal
      this.project.deadline = this.model['year'] + '-' + this.model['month'] + '-' + this.model['day'];
      this.project.id = this.selectedProject.id;
      this.selectedProject.title=this.project.title; this.selectedProject.description = this.project.description;
      this.selectedProject.max_price = this.project.max_price; this.selectedProject.min_price = this.project.min_price;
      this.selectedProject.deadline = this.project.deadline; this.selectedProject.t_id = this.project.t_id;
      this.projectService.updateProject(this.project);
    }
  }

  deleteProject() {
    this.projectService.deleteProject(this.selectedProject.id);
    let index = this.activeProjects.findIndex(p => p.id === this.selectedProject.id);
    this.activeProjects.splice(index, 1);
  }

  createProfileForm() {
    this.profileForm = this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        password_hash: ['', Validators.required],
        email: ['', Validators.required]
    });
  }

  selectProfile() {
    console.log(this.userService.user.name);
    this.profileForm.setValue({name: this.userService.user.name, surname: this.userService.user.surname,
      email: this.userService.user.email, password_hash: this.userService.user.password_hash});
  }

  postProfile() {
    if (this.profileForm.valid) {
      this.profile = Object.assign({}, this.profileForm.value);
      this.profile.id = this.userService.getCurrentUserId();
    }
    this.userService.user.name = this.profile.name; this.userService.user.surname = this.profile.surname;
    this.userService.user.email = this.profile.email; this.userService.user.password_hash = this.profile.password_hash;

    if (this.userService.isInstructor()) {
      this.userService.updateInstructor(this.profile);
    } else {
      this.userService.updateStudent(this.profile);
    }
  }

  getContracts() {
    if (this.userService.isStudent()) {
      this.projectService.getPasiveProjectsByStudentId(this.userService.getCurrentUserId()).subscribe(data => {
        this.pasiveProjects = data;
      });
    } else {
      this.projectService.getPasiveProjectsByInstructorId(this.userService.getCurrentUserId()).subscribe(data => {
        this.pasiveProjects = data;
      });
    }
  }

  getProposals() {
    this.proposalService.getActiveProposalsByInstructorId(this.userService.getCurrentUserId()).subscribe(data => {
      this.activeProposals = data;
    });
  }

  getProjects() {
    this.projectService.getActiveProjectsByStudentId(this.userService.getCurrentUserId()).subscribe(data => {
      this.activeProjects = data;
    });
  }
}
