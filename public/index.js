function insertNewPost(postCateg, postTitle, postLink, postPoster/*, postComments*/) {
  var postContext = {
   category: postCateg,
   title: postTitle,
   link: postLink,
   poster: postPoster,
   comments: /*postComments*/[]
  };

  //console.log("postContext = ", postContext);
  var postHTML = Handlebars.templates.posts(postContext);
  //console.log("postHTML = ", postHTML);

  var postList = document.getElementById('posts');
  postList.insertAdjacentHTML('beforeend', postHTML);
}


var allPosts = [];

/*
 * This function checks whether all of the required inputs were supplied by
 * the user and, if so,i nserting a new post into the page constructed using
 * these inputs.  If the user did not supply a required input, they instead
 * recieve an alert, and no new post is inserted.
 */
function handleModalInsert()
{
  var title = document.getElementById('post-title-input').value.trim();
  var link = document.getElementById('post-link-input').value.trim();
  var poster = document.getElementById('poster-name-input').value.trim();
  var category = document.getElementById('post-categ-input').value.trim();
  //var condition = document.querySelector('#post-condition-fieldset input:checked').value;

  if (!title || !link || !poster || !category) {
    alert("You must fill in all of the fields!");
  } else {

    allPosts.push({
      category: category,
      title: title,
      link: link,
      poster: poster,
      comments: []
    });
    insertNewPost(category, title, link, poster/*, postComments*/)

    title.value = "";
    link.value = "";
    poster.value = "";
    category.value = "";

    hideInsertModal();
  }
}

function postPassesFilters(post, filters) {

  if(filters.type == "title"){
    if (filters.text) {
      var postSearchText = post.title.toLowerCase();
      var filterText = filters.text.toLowerCase();
      if (postSearchText.indexOf(filterText) === -1) {
        return false;
      }
    }
  }

  if(filters.type == "link"){
    if (filters.text) {
      var postSearchText = post.link.toLowerCase();
      var filterText = filters.text.toLowerCase();
      if (postSearchText.indexOf(filterText) === -1) {
        return false;
      }
    }
  }

  if(filters.type == "poster"){
    if (filters.text) {
      var postSearchText = post.poster.toLowerCase();
      var filterText = filters.text.toLowerCase();
      if (postSearchText.indexOf(filterText) === -1) {
        return false;
      }
    }
  }

  return true;

}

function handleModalFilter()
{

  var filters = {
    text: document.getElementById('search-text-input').value.trim(),
    type: document.querySelectorAll("#post-condition-fieldset input:checked")[0].value
  }

  var postContainer = document.getElementById('posts');
  while(postContainer.lastChild){
    postContainer.removeChild(postContainer.lastChild);
  }

  allPosts.forEach(function (post){
    if(postPassesFilters(post, filters)) {
      insertNewPost(post.category, post.title, post.link, post.poster, post.comments);
    }
  });
}


function applyNewCategories()
{
  var cats = ['false', 'false', 'false', 'false', 'false', 'false', 'false', 'false', 'false']


  //console.log("applying new categories");

  var desCateg = document.getElementsByClassName('categ-option');

  //console.log("desCateg = ", desCateg);

  for(i = 0; i < desCateg.length; i++)
  {
    //console.log("desCateg[i] = ", desCateg[i]);
    //console.log("desCateg[i].checked = ", desCateg[i].checked);
    if(desCateg[i].checked)
    {
      cats[i] = 'true';
    }
  }

  // var request = new XMLHttpRequest();
  // var requestURL = '/?' + 'SearchEngines=' + cats[0] + '&Shopping=' + cats[1] + '&Games=' + cats[2] + '&SocialMedia=' + cats[3] + '&Educational=' + cats[4] + '&Interesting=' + cats[5] + '&StreamingSites=' + cats[6] + '&Wikis=' + cats[7] + '&Funny=' + cats[8];
  // request.open('GET', requestURL);
  // request.send();
  window.location.href = '/' + '?' + 'SearchEngines=' + cats[0] + '&Shopping=' + cats[1] + '&Games=' + cats[2] + '&SocialMedia=' + cats[3] + '&Educational=' + cats[4] + '&Interesting=' + cats[5] + '&StreamingSites=' + cats[6] + '&Wikis=' + cats[7] + '&Funny=' + cats[8];
}

function showInsertModal()
{
  hideCategModal();
  hideFilterModal();

  var insertModal = document.getElementById('create-new-post-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  //alert("showing insert modal");

  insertModal.classList.remove('hidden-create');
  modalBackdrop.classList.remove('hidden-create');
}

function hideInsertModal()
{

  var insertModal = document.getElementById('create-new-post-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  insertModal.classList.add('hidden-create');
  modalBackdrop.classList.add('hidden-create');

  //alert("hiding insert modal");

  document.getElementById('post-title-input').value = "";
  document.getElementById('post-link-input').value = "";
  document.getElementById('poster-name-input').value = "";
  document.getElementById('post-categ-input').value = "";
}


function showFilterModal() {
  hideCategModal();
  hideInsertModal();

  var searchModal = document.getElementById('search-something');
  var modalBackdrop = document.getElementById('modal-backdrop');

  //alert("showing filter modal");

  searchModal.classList.remove('hidden-filter');
  modalBackdrop.classList.remove('hidden-create');
}

function hideFilterModal()
{
  var searchModal = document.getElementById('search-something');
  var modalBackdrop = document.getElementById('modal-backdrop');

  //alert("hiding filter modal");

  searchModal.classList.add('hidden-filter');
  modalBackdrop.classList.add('hidden-create');

  document.getElementById('search-text-input').value = "";
}


function showCategModal()
{
  hideFilterModal();
  hideInsertModal();

  var categModal = document.getElementById('choose-categories-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  //alert("showing categories modal");

  categModal.classList.remove('hidden-categ');
  modalBackdrop.classList.remove('hidden-create');
}

function hideCategModal()
{

  var categModal = document.getElementById('choose-categories-modal');
  var modalBackdrop = document.getElementById('modal-backdrop');

  //alert("hiding categories modal");

  categModal.classList.add('hidden-categ');
  modalBackdrop.classList.add('hidden-create');
}


//Wait until the DOM content is loaded, and then hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function ()
{
  //Remember all of the initial post elements initially displayed in the page.
  var postElems = document.getElementsByClassName('post');
  for (var i = 0; i < postElems.length; i++) {
    allPosts.push(parsePostElem(postElems[i]));
  }

  //console.log("allPosts = ", allPosts);

  //insert modal event listeners
  var insertButton = document.getElementById('create-new-post');
  if (insertButton) {
    insertButton.addEventListener('click', showInsertModal);
  }

  var insertAcceptButton = document.getElementById('modal-accept');
  if (insertAcceptButton) {
    insertAcceptButton.addEventListener('click', handleModalInsert);
  }

  var insertHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < insertHideButtons.length; i++) {
    insertHideButtons[i].addEventListener('click', hideInsertModal);
  }


  //search modal event listeners
  var searchButton = document.getElementById('filter-input-container');
  if (searchButton) {
    searchButton.addEventListener('click', showFilterModal);
  }

  var searchAcceptButton = document.getElementById('filter-modal-accept');
  if (searchAcceptButton) {
    searchAcceptButton.addEventListener('click', handleModalFilter);
  }

  var searchHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < searchHideButtons.length; i++) {
    searchHideButtons[i].addEventListener('click', hideFilterModal);
  } //there's no apply/cancel buttons in the search modal


  //categories modal event listeners
  var categButton = document.getElementById('show-categories');
  if (categButton) {
    categButton.addEventListener('click', showCategModal);
  }

  var categApplyButton = document.getElementById('categ-modal-accept');
  if (categApplyButton) {
    categApplyButton.addEventListener('click', applyNewCategories);
  }

  var categHideButtons = document.getElementsByClassName('modal-hide-button');
  for (var i = 0; i < categHideButtons.length; i++) {
    categHideButtons[i].addEventListener('click', hideCategModal);
  }


  //comment posting event listeners
  var postComment = document.getElementsByClassName('post-comment-button');
  for (var i = 0; i < postComment.length; i++)
  {
    //console.log("adding listener...");
    postComment[i].addEventListener('click', function (event)
    {
      var relevantPost = event.currentTarget.parentElement.parentElement;
      //console.log("relevantPost = ", relevantPost);
      var text = relevantPost.querySelector('#new-comment').value.trim();
      //console.log("text = ", text);

      relevantPost.insertAdjacentHTML('beforebegin', '<div class="comment-container"><p class="actual-comment">' + text + '</p></div>');
      relevantPost.querySelector('#new-comment').value = "";
    });
    //console.log("listener added");
  }
});



/*
 * This function parses an existing DOM element representing a single post
 * into an object representing that post and returns that object.  The object
 * is structured like this:
 *
 * {
 *   category: "...",
 *   title: "...",
 *   link: ...,
 *   poster: "...",
 *   comments: []
 * }
 */
function parsePostElem(postElem) {
  var post = {
    category: postElem.getAttribute('category'),
    title: postElem.getAttribute('title'),
    link: postElem.getAttribute('link'),
    poster: postElem.getAttribute('poster'),
    comments: []//should be fixed
  };

  return post;
}
