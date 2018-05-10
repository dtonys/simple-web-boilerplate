(function () {

  function setupDataLoading() {
    const $loadDataBtn = document.querySelector('.loadDataBtn');
    const $postList = document.querySelector('.postList');

    const listTemplate = _.template(`
      <div>
        <% items.forEach(( item ) => { %>
          <div> <%= JSON.stringify(item) %> </div>
          <br />
        <% }) %>
      </div>
    `);

    function renderTemplate( data ) {
      $postList.innerHTML = listTemplate({
        items: data,
      });
    }

    function loadData() {
      window.unfetch('https://jsonplaceholder.typicode.com/posts')
        .then(( response ) => {
          return response.json();
        })
        .then(( data ) => {
          return renderTemplate(data.slice(0, 5));
        });
    }

    $loadDataBtn.addEventListener('click', loadData );
  }

  function setupTodoList() {
    const $input = document.querySelector('.todoInput');
    const $addBtn = document.querySelector('.addBtn');
    const $todoList = document.querySelector('.todoList');
    const todos = [];

    const todoList = _.template(`
      <div>
        <% items.forEach(( item ) => { %>
          <div> <%= item %> </div>
          <br />
        <% }) %>
      </div>
    `);

    function renderTemplate() {
      $todoList.innerHTML = todoList({
        items: todos,
      });
    }

    function addTodo() {
      const value = $input.value;
      todos.push(value);
      renderTemplate();
      $input.value = '';
    }

    $addBtn.addEventListener('click', addTodo );
  }

  function setupFormSubmit() {
    const $demoForm = document.querySelector('.demoForm');

    function submitForm( data ) {
      window.unfetch('/echo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: data,
      })
        .then(( response ) => {
          return response.json();
        })
        .then(( responseData ) => {
          alert( JSON.stringify(responseData, null, 2) ); // eslint-disable-line
        });
    }

    $demoForm.addEventListener('submit', ( event ) => {
      event.preventDefault();
      const data = window.serialize($demoForm);
      submitForm(data);
    });

  }

  function initialize() {
    setupDataLoading();
    setupTodoList();
    setupFormSubmit();
  }

  /**
   * entry point
   */
  const domContentLoadedPromise = new window.Promise( (resolve) => {
    document.addEventListener('DOMContentLoaded', resolve);
  });
  domContentLoadedPromise
    .then(initialize);
})();
