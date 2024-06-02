// Задание: Написать класс работы с записями(добавление, удаление, получение списка, получение одной записи, 
// изменение записи) хранение записей в local storage. запись состоит из следующих полей:
// 1. заголовок
// 2. описание
// 3. время создания
// 4. время изменения
// 5. маркер выполнения

class RecWork {
   constructor() {
      this.recs = [];
   }

   genId() {
      let randomNum = (Math.random()*(this.recs.length))
      if(!this.recs) {
         return randomNum;
      } else {
         return randomNum + 1
      }
   }

   addRec(record) {
      record.id = this.genId();
      record.created_time = new Date();
      record.updated_time = new Date();
      record.marker_done = false;
      this.recs.push(record);

      this.saveRecs();
   }

   delRec(id) {
      this.recs = this.recs.filter((record) => record.id !== id);

      this.saveRecs();
   }
   
   getRecs() {
      return this.recs;
   }

   getRec(id) {
      return this.recs.find((record) => record.id === id);
   }

   сheckingExist(rec) {
      if (!rec) {
         return;
      }
   }

   updRec(id, updRec) {
      const record = this.getRec(id);

      this.сheckingExist(record)

      record.title = updRec.title;
      record.description = updRec.description;
      record.updated_time = new Date();

      this.saveRecs();
   }

   toggleRecDone(id) {
      const record = this.getRec(id);

      this.сheckingExist(record)

      record.marker_done = !record.marker_done;

      this.saveRecs();
   }

   saveRecs() {
      localStorage.setItem("records", JSON.stringify(this.recs));
   }
}

   const recManage = new RecWork();
// 1. Выполнение Тестирования класса RecWork в браузере для HTML элементов и их отображения.
      const addRecForm = document.querySelector('.add-rec-form'),
            titleInput = document.querySelector('#title'),
            dscrInput = document.querySelector('#dscr'),
            recordsList = document.querySelector('.records-list');

      addRecForm.addEventListener('submit', (e) => {
         e.preventDefault();

         const rec = {
            title: titleInput.value,
            description: dscrInput.value,
         };

         recManage.addRec(rec);

         titleInput.value = '';
         dscrInput.value = '';

         renderRecs();
      });

      function renderRecs() {

         recordsList.innerHTML = '';

         const records = recManage.getRecs();

         for (const record of records) {
            const lstItem = document.createElement('li'), 
                  header = document.createElement('h3'),
                  dscr = document.createElement('p'),
                  delBtn = document.createElement('button'),
                  toggleDoneBtn = document.createElement('button');

            header.textContent = record.title;
            dscr.textContent = record.description;
            delBtn.textContent = 'Удалить';
            toggleDoneBtn.textContent = record.marker_done ? 'Отметить как невыполненное' : 'Отметить как выполненное';

            delBtn.addEventListener('click', () => {
               recManage.delRec(record.id);
               renderRecs();
            });

            toggleDoneBtn.addEventListener('click', () => {
               recManage.toggleRecDone(record.id);
               renderRecs();
            });

            lstItem.appendChild(header);
            lstItem.appendChild(dscr);
            lstItem.appendChild(delBtn);
            lstItem.appendChild(toggleDoneBtn);
            recordsList.appendChild(lstItem);
         }
      }
//2. Выполнение Тестирования класса RecWork в браузере через JS.

/* const newRec = {
   title: "Запись №1",
   description: "Здесь что-то написано",
};
//Добавление
console.log("Добавилась запись:", recManage.addRec(newRec))

// Удаление
const idToDel = newRec.id; 

console.log(recManage.delRec(idToDel));

console.log(recManage.getRecs());

 // Вывод конкретной записи по Айди
const findRec = recManage.getRec(idToDel); 
console.log(findRec === null ? "Запись не найдена" : findRec);

 // Обновление
const updRec = {
   title: "Запись №3",
   description: "Здесь теперь описание 3 записи",
};

console.log(recManage.updRec(idToDel, updRec));

 // Проверка метода toggleRecDone()

console.log(recManage.toggleRecDone(idToDel)); */