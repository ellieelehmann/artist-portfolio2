
//subpages views
document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll(".view")
    //const db = new PouchDB('artwork_db'); // initalizing pouchDB
    function navigate(viewId) {
        
          // Hide all views
          views.forEach(view => {
            view.style.display = "none";
          });
          // show the requested view
          document.getElementById(viewId).style.display = "block";
        // storing the current view in local stroage 
          localStorage.setItem('currentView', viewId);
        }
        function displayView() { // a function to check to see if view was displayed if not display it 
            const storedView = localStorage.getItem('currentView');
            if (storedView) {
                navigate(storedView);
            } else {
                navigate('homeView');
            }
        }


        // event listeners for each subpage link 
    const subpages = document.querySelectorAll('.subpages a');
    subpages.forEach(subpage => {
    subpage.addEventListener('click', function(event) {
        event.preventDefault(); // when user clicks on <a> anchor element pervents the defult will not reload the enitre page _> navigates to specific href link 
        const viewId = this.getAttribute('href').substring(1); 
        navigate(viewId);
        });
    });
// home button 
    const homeButton = document.querySelectorAll('.home');
    homeButton.forEach(button => {
      button.addEventListener('click', function(event) {
          event.preventDefault();
          navigate('homeView');
      });
  });


  // idea form 

  const form = document.getElementById('idform'); // grabbing elemnts from idea view page 
  const input = document.getElementById('Input');
  const message = document.getElementById('message');


  function fetchIdeas() { // retrieves list of idea from backend 
    fetch('/api/ideas') // fetching ideas from databse 
        .then(response => response.json()) // update ui to display these ideas
        .then(ideas => {
            const ideasList = document.getElementById('ideasList');
            ideasList.innerHTML = ''; // clear existing ideas 
            ideas.forEach(idea => {
                const ideaItem = document.createElement('li'); // create element for each idea and a place them into idea list in front end 
                ideaItem.textContent = idea.idea;
                ideasList.appendChild(ideaItem);
            });
        })
        .catch(error => console.error('Error fetching idea:', error));
}


  form.addEventListener('submit', function(event) {  // submit button 
    event.preventDefault();
    const idea = input.value.trim();// gets rid of leading whitespaces and input error 
    fetch('/api/ideas', {  // returns a promise to response object 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',  
        },
        body: JSON.stringify({ idea }), // body of idea into string 
    })
    .then(response => {response.json();
        })//process the response 
    .then(data => { //callbacks after the resolution of the response 
        message.innerHTML = data.message; 
        input.value = '';
        fetchIdeas();
    })
    .catch(error => {
        console.error('Error:', error);
        message.innerHTML = 'An error occurred while saving the idea.';
    });
});


const fetchIdeasButton = document.getElementById('fetchIdeasButton');
fetchIdeasButton.addEventListener('click', function() {
    fetchIdeas(); 
});


fetchIdeas();
        

    //event listener for clicking on the grid items

    const griditems = document.querySelectorAll('.grid-item');
    griditems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const artworkImage = this.querySelector('img').src;
            const artworkDescription = this.querySelector('.hidden-des').textContent; // hidden attributwe from html access
            const artworkTitle = this.querySelector('h2').textContent;
            let  contentSrc = '';
            

            // db.put({ //assigning artwork attributes to database
                
            //     _id: artworkTitle,
            //     title:artworkTitle,
            //     image:artworkImage,
            //     description: artworkDescription
            
            // }).then(() => { //saving in local storage and  navigating 
            localStorage.setItem('selectedArtwork', JSON.stringify({
                    title: artworkTitle,
                    image: artworkImage,
                    description: artworkDescription,
                    src: contentSrc
            }));
            navigate('artworkView'); 
            displayArtView();

        });

    });
            
           
            

            //store in local storage so that in artwork details I can load it from local storage
    

    
    function displayArtView(){
        const storeArtwork = localStorage.getItem('selectedArtwork');
        if (storeArtwork) {
            const artwork = JSON.parse(storeArtwork);
            const expandedArtwork = document.getElementById('expandedArtwork');
            const artworkTitleValue = document.getElementById('artworkTitle');
            const artworkDescriptionValue = document.getElementById('artworkDescription'); // retrieve

            expandedArtwork.src = artwork.image;
                expandedArtwork.style.display = 'block';

            artworkTitleValue.textContent= artwork.title;
            artworkDescriptionValue.textContent = artwork.description;
        }
    }




     // get home button again because new view?
      // Initialize with the home view
    displayView(); 


    document.getElementById('artworkView').addEventListener('click', function() {
        displayArtView();
    });


}); 






