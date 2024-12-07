import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TaskService } from '../../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  newTask: string = '';
  tasks: any[] = [];

  constructor(
    private taskService: TaskService,
    private modalController: ModalController
  ) {}

  ngOnInit(): void {
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

  async openEditTaskModal(task: any) {
    const modal = await this.modalController.create({
      component: EditTaskComponent,
      componentProps: { task: { ...task } }, // Pass a copy of the task to avoid accidental changes
    });

    // Handle the updated task returned from the modal
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.taskService.updateTask(task.id, result.data).then(() => {
          console.log('Task updated successfully');
        }).catch((error) => {
          console.error('Error updating task:', error);
        });
      }
    });

    await modal.present();
  }
}
