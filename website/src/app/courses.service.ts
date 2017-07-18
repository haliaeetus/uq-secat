import { Injectable, isDevMode } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Course } from './courses';

@Injectable()
export class CoursesService {
    courses: any = {};
    courseList: string[] = [];
    api:string = "api/";

    constructor(private http: Http) {
        if (!isDevMode()) {
            this.api = "uq-secat/api/";
        }
        this.http.get(this.api + "courses.json")
            .toPromise()
            .then(response => {
                this.courses = response.json();
                this.courseList = Object.keys(this.courses);
            })
            .catch(this.handleError);
    }

    getCourses(): Promise<string[]> {
        return this.http.get(this.api + "courses.json")
            .toPromise()
            .then(response => Object.keys(response.json()))
            .catch(this.handleError);
    }

    getCourse(code: string): any {
        if (this.courses.hasOwnProperty(code)) {
            return this.courses[code];
        } else {
            return null;
        }
    }

    getSecat(code: string, year: string, sem: number): Promise<Course> {
        return this.http.get(this.api + code + "/" + year + "/" + sem + ".json")
            .toPromise()
            .then(response => response.json() as Course)
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}