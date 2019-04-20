import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../services/project.service';
import { Tag } from '../models/tag';
import { TagService } from '../services/tag.service';
import { AlertifyService } from '../services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project: Project;
  projectForm: FormGroup;
  tags: Tag[];
  model;

  // tslint:disable-next-line:max-line-length
  constructor(
    private projectService: ProjectService,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService,
    private router: Router
    ) { }
  ngOnInit() {
    this.createProjectForm();
  }

  createProjectForm() {
    this.projectForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      maxPrice: ['', Validators.required],
      minPrice: ['', Validators.required],
      deadline: ['', Validators.required],
    });
  }

  postProject() {
    if (this.projectForm.valid) {
      this.project = Object.assign({}, this.projectForm.value);
      this.projectService.createProject(this.project);
      this.alertifyService.success('Project created successfully.');
      this.router.navigateByUrl('/projects');
    }
  }

  getTags() {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    });
  }
}
