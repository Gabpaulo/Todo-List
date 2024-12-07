import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  newTask: string = '';
  tasks: any[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Fetch tasks from Firestore
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
    });
  }

  addTask(): void {
    if (this.newTask.trim()) {
      const task = { name: this.newTask, completed: false };
      this.taskService.addTask(task).then(() => {
        console.log('Task added successfully');
        this.newTask = '';
      }).catch((error) => {
        console.error('Error adding task:', error);
      });
    }
  }

  deleteTask(task: any): void {
    this.taskService.deleteTask(task.id).then(() => {
      console.log('Task deleted successfully');
    }).catch((error) => {
      console.error('Error deleting task:', error);
    });
  }
}
