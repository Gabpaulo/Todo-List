import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss'],
})
export class EditTaskComponent {
  @Input() task: any; // Input task passed to the modal

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss(); // Close the modal without saving
  }

  saveTask() {
    // Close the modal and pass the updated task back
    this.modalController.dismiss(this.task);
  }
}
