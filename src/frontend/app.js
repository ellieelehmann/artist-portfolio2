

//subpages views
document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll(".view")
    
    
    function navigate(viewId) {
        
          // Hide all viewss
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

 
    //event listener for clicking on the grid items

    const griditems = document.querySelectorAll('.grid-item');
    griditems.forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            const artworkImage = this.querySelector('img').src;
            const artworkDescription = this.querySelector('.hidden-des').textContent; // hidden attributwe from html access
            const artworkTitle = this.querySelector('h2').textContent;
            let  contentSrc = '';
            

           
         
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




// idea view 
async function formSubmit(){

}

async function createIdea(){

}

async function displayIdeas(){

}

async function editIdea(){

}

async function deleteIdea(){

}

function ideaButtons(){

}

const form = document.getElementById('idform');
form.addEventListener('submit', formSubmit);

displayIdeas(); 

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



