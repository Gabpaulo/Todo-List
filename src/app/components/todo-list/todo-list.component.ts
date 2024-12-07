import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
    private modalController: ModalController,
    private alertController: AlertController
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

  async deleteTask(task: any): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Delete Task',
      message: `Are you sure you want to delete "${task.name}"?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.taskService.deleteTask(task.id).then(() => {
              console.log('Task deleted successfully');
            }).catch((error) => {
              console.error('Error deleting task:', error);
            });
          },
        },
      ],
    });

    await alert.present();
  }

  async openEditTaskModal(task: any) {
    const modal = await this.modalController.create({
      component: EditTaskComponent,
      componentProps: { task: { ...task } },
    });

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
