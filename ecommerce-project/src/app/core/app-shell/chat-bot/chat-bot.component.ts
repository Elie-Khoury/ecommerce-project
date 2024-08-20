import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.scss'
})
export class ChatBotComponent implements AfterViewInit {
  args!: {
    openButton: HTMLButtonElement | null;
    chatBox: HTMLElement | null;
    sendButton: HTMLButtonElement | null;
    closeButton: HTMLButtonElement | null;
  };
  state: boolean = false;
  messages: { name: string; message: string }[] = [{
    name: "Sam",
    message: "Hi there, how can I help you today?"
  }];

  constructor() { }

  ngAfterViewInit(): void {
    this.args = {
      openButton: document.querySelector('.chatbox__button'),
      chatBox: document.querySelector('.chatbox__support'),
      sendButton: document.querySelector('.send__button'),
      closeButton: document.querySelector('.close-btn')
    };

    this.display();
  }

  display() {
    const { openButton, chatBox, sendButton, closeButton } = this.args;

    if (openButton && chatBox && sendButton && closeButton) {
      openButton.addEventListener('click', () => {
        this.toggleState(chatBox)
        if (this.state) {
          this.updateChatText(chatBox);
        }
      });
      sendButton.addEventListener('click', () => this.onSendButton(chatBox));
      closeButton.addEventListener('click', () => this.toggleState(chatBox));

      const node = chatBox.querySelector('input');
      if (node) {
        node.addEventListener('keyup', (event: KeyboardEvent) => {
          if (event.key === 'Enter') {
            this.onSendButton(chatBox);
          }
        });
      }
    }
  }

  toggleState(chatbox: HTMLElement) {
    this.state = !this.state;

    // Show or hide the box
    if (this.state) {
      chatbox.classList.add('chatbox--active');
    } else {
      chatbox.classList.remove('chatbox--active');
    }
  }

  onSendButton(chatbox: HTMLElement) {
    const textField = chatbox.querySelector('input') as HTMLInputElement;
    const text1 = textField.value;
    if (text1 === '') {
      return;
    }

    const msg1 = { name: 'User', message: text1 };
    this.messages.push(msg1);

    fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      body: JSON.stringify({ message: text1 }),
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(r => {
        const msg2 = { name: 'Sam', message: r.answer };
        this.messages.push(msg2);
        this.updateChatText(chatbox);
        textField.value = '';
      })
      .catch(error => {
        console.error('Error:', error);
        this.updateChatText(chatbox);
        textField.value = '';
      });
  }

  updateChatText(chatbox: HTMLElement) {
    let html = '';
    this.messages
      .slice()
      .reverse()
      .forEach(item => {
        if (item.name === 'Sam') {
          html += `<div style="
          max-width: 80%; 
          width: fit-content; 
          margin: 5% 0%; 
          background: #c3c3c3;
          color: black;
          word-wrap: break-word; 
          overflow-wrap: break-word; 
          white-space: normal; 
          padding: 2% 3%";
          class="messages__item messages__item--visitor">${item.message}</div>`;
        } else {
          html += `<div style="
          align-self: flex-end;
          max-width: 80%; 
          width: fit-content; 
          margin: 5% 0%; 
          background: #212322;
          color: white;
          word-wrap: break-word; 
          overflow-wrap: break-word; 
          white-space: normal; 
          padding: 2% 3%";
          class="messages__item messages__item--operator">${item.message}</div>`;
        }
      });

    const chatmessage = chatbox.querySelector('.chatbox__messages') as HTMLElement;
    chatmessage.innerHTML = html;
  }
}
