
//subpages views
document.addEventListener('DOMContentLoaded', () => {
    const views = document.querySelectorAll(".view")
    const ideasContainer = document.getElementById('ideasContainer');
    
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


    const form = document.getElementById('idform');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const ideaInput = document.getElementById('input-idea');
        const idea = ideaInput.value.trim();

        try {
            const result = await fetch("http://localhost:3260/create", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idea: idea }),
            });

            if (!result.ok) {
                throw new Error('Failed to add idea');
            }

            ideaInput.value = ''; // Clear 
            await result.json();

            // After successful submission, fetch and display all ideas
            displayIdeas();
        } catch (err) {
            console.error('Error submitting idea:', err);
        }
    });

    
    async function displayIdeas() {
        try {
            const response = await fetch("http://localhost:3260/ideas");
            if (!response.ok) {
                throw new Error('Failed to fetch ideas');
            }
            const ideas = await response.json();
            const ideasContainer = document.getElementById('ideasContainer');
            ideasContainer.innerHTML = ''; // Clear previous content
            ideas.forEach(idea => {
                const ideaElement = document.createElement('div');
                ideaElement.textContent = idea.idea;
                ideasContainer.appendChild(ideaElement);// create new element for each idea
            });
            navigate('ideaView');//switch to ideas
        } catch(err){
        console.error('Error fetching ideas:', err);
        }
    }

    
           
            

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



