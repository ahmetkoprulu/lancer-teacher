import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Project } from '../models/project';
import { ProjectService } from '../services/project.service';
import { identity } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/instructor';

@Component({
  selector: 'app-instructor-profile',
  templateUrl: './instructor-profile.component.html',
  styleUrls: ['./instructor-profile.component.css']
})
export class InstructorProfileComponent implements OnInit {
  pasiveProjects: Project[];
  instructor: User;

  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      // tslint:disable-next-line:no-string-literal
      this.getInstructor(params['uId']);
      // tslint:disable-next-line:no-string-literal
      this.getContracts(params['uId']);
    });
  }

  getInstructor(id){
    this.userService.getInstructorById(id).subscribe(data => {
      this.instructor = data;
    });
  }

  getContracts(id) {
    this.projectService.getPasiveProjectsByInstructorId(id).subscribe(data => {
      this.pasiveProjects = data;
    });
  }
}
