import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [ProjectService]
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { }
  projects: Project[];

  ngOnInit() {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

}
