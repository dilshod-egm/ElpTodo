// Находим элементы по классам
const addButton = document.querySelector(".add-task-btn");
const inputTask = document.querySelector(".add-task-input");
const taskInbox = document.querySelector(".task-inbox");
const NoTask = document.querySelector(".notask");

// Добавляем обработчик события клика на кнопку
addButton.addEventListener("click", () => {
  // Получаем значение текста из поля ввода
  const taskTitle = inputTask.value;

  // Проверяем, чтобы поле ввода не было пустым
  if (taskTitle.trim() === "") {
    alert("Введите задачу!");
    return;
  }

  // Создаем новый элемент div с классом .task-cart
  const newTask = document.createElement("div");
  newTask.className = "task-cart";

  const addSubtaskButton = document.createElement("button");
  addSubtaskButton.classList.add("add-subtask");

  // Вставляем HTML код задачи в новый элемент
  newTask.innerHTML = `
    <div class="cart-top">
      <textarea rows="1" cols="2" placeholder="Big Task" class="cart-title">${taskTitle}</textarea>
      <div class="progress-percent">0%</div>
    </div>
    <div id="createdDate" class="date-cart">${getCurrentDate()}</div>
    <progress id="progressBar" class="progress-bar" value="0" max="100"></progress>
    <div class="subtask-inbox">
    
    </div>
    <div class="cart-bottom">
    <button class="add-subtask">New Task</button>
    <div class="cart-button">
    <button class="change-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
    <path d="M16 4.19201C16.0006 4.08672 15.9804 3.98235 15.9406 3.88488C15.9008 3.78741 15.8421 3.69876 15.768 3.62401L12.376 0.232013C12.3012 0.157868 12.2126 0.0992079 12.1151 0.0593963C12.0176 0.0195847 11.9133 -0.000595342 11.808 1.33714e-05C11.7027 -0.000595342 11.5983 0.0195847 11.5009 0.0593963C11.4034 0.0992079 11.3147 0.157868 11.24 0.232013L8.976 2.49601L0.232013 11.24C0.157868 11.3147 0.0992079 11.4034 0.0593963 11.5009C0.0195847 11.5983 -0.000595342 11.7027 1.33714e-05 11.808V15.2C1.33714e-05 15.4122 0.0842987 15.6156 0.234328 15.7657C0.384356 15.9157 0.587839 16 0.800012 16H4.19201C4.30395 16.0061 4.41592 15.9886 4.52066 15.9486C4.6254 15.9086 4.72057 15.8471 4.8 15.768L13.496 7.024L15.768 4.80001C15.841 4.72247 15.9005 4.63323 15.944 4.53601C15.9517 4.47224 15.9517 4.40777 15.944 4.34401C15.9477 4.30677 15.9477 4.26925 15.944 4.23201L16 4.19201ZM3.86401 14.4H1.60001V12.136L9.544 4.19201L11.808 6.456L3.86401 14.4ZM12.936 5.328L10.672 3.06401L11.808 1.93601L14.064 4.19201L12.936 5.328Z" fill="#F5F5F5"/>
    </svg>
    </button>
    <button class="delete-btn">
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
    <path d="M12 0.888889H9L8.14286 0H3.85714L3 0.888889H0V2.66667H12M0.857143 14.2222C0.857143 14.6937 1.03775 15.1459 1.35925 15.4793C1.68074 15.8127 2.11677 16 2.57143 16H9.42857C9.88323 16 10.3193 15.8127 10.6408 15.4793C10.9622 15.1459 11.1429 14.6937 11.1429 14.2222V3.55556H0.857143V14.2222Z" fill="#04DEDE"/>
    </svg>
    </button>
    </div>
    </div>
    `;

  // Вставляем созданный элемент в список задач
  taskInbox.appendChild(newTask);

  // Удаляем Notask
  NoTask.style.display = "none";

  // Очищаем поле ввода
  inputTask.value = "";
});

// Функция для получения текущей даты в формате "ДД.ММ.ГГГГ"
function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const year = currentDate.getFullYear();
  return `${day}.${month}.${year}`;
}

// Находим все кнопки "Добавить подзадачу"

// Добавляем обработчик события клика на родительский элемент
taskInbox.addEventListener("click", (event) => {
  const targetElement = event.target;

  // const taskDeleteBtns = document.querySelectorAll(".delete-btn");
  const taskDelete = document.querySelectorAll(".delete-btn");

  taskDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const parent = e.target.closest(".task-cart");
      parent.remove();
      if (parent) {
        parent.remove();
        // Проверяем, есть ли еще карточки .task-cart
        const remainingTaskCarts = document.querySelectorAll(".task-cart");
        if (remainingTaskCarts.length === 0) {
          // Если карточек нет, показываем элемент .notask
          NoTask.style.display = "flex";
        }
      }
    });
  });

  // Проверяем, что клик был на кнопке .add-subtask
  if (targetElement.classList.contains("add-subtask")) {
    // Находим родительскую карточку .task-cart
    const taskCart = targetElement.closest(".task-cart");

    // Проверяем, что нашли карточку
    if (taskCart) {
      // Создаем новую подзадачу внутри карточки
      const subtask = document.createElement("label");
      subtask.className = "checkbox subtask";
      subtask.innerHTML = `
      <input type="checkbox" />
      <div class="checkbox-checkmark"></div>
      <textarea class="checkbox-body" cols="40" rows="2" placeholder="text"></textarea>
      `;

      subtask.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        // Удаляем элемент из DOM
        subtask.remove();
      });

      // Находим область для вставки подзадач в карточке
      const subtaskInbox = taskCart.querySelector(".subtask-inbox");
      subtaskInbox.appendChild(subtask);

      const newSubtaskTextarea = subtask.querySelector(".checkbox-body");

      // Фокусируемся на textarea для того, чтобы пользователь мог сразу же вводить текст
      newSubtaskTextarea.focus();
    }
  }
});

// Обработчик события для изменения состояния checkbox'ов
taskInbox.addEventListener("change", (event) => {
  const targetElement = event.target;

  // Проверяем, что клик был на checkbox'е
  if (targetElement.type === "checkbox") {
    // Находим родительскую карточку .task-cart
    const taskCart = targetElement.closest(".task-cart");

    // Проверяем, что нашли карточку
    if (taskCart) {
      // Находим все checkbox'ы внутри карточки
      const checkboxes = taskCart.querySelectorAll('input[type="checkbox"]');

      // Подсчитываем количество отмеченных checkbox'ов
      const checkedCount = [...checkboxes].filter(
        (checkbox) => checkbox.checked
      ).length;

      // Обновляем progress-bar основной задачи
      updateProgressBar(taskCart, checkboxes.length, checkedCount);
    }
  }
});

// Функция для обновления progress-bar основной задачи
function updateProgressBar(taskCart, totalSubtasks, checkedSubtasks) {
  const progressBar = taskCart.querySelector(".progress-bar");
  const progressPercent = taskCart.querySelector(".progress-percent");

  // Вычисляем процент выполнения основной задачи
  const completionPercentage = (checkedSubtasks / totalSubtasks) * 100;

  // Обновляем значения progress-bar и текста процента
  progressBar.value = completionPercentage;
  progressPercent.textContent = `${completionPercentage.toFixed(0)}%`;
}
