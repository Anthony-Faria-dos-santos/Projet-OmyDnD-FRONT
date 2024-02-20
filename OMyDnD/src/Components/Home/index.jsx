function HomePage() {

  return ( 
    <div className="bg-gray-900">
    <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 mt-4">
      
      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">

        <div className="flex flex-col-reverse m-2">
          <img src="../images/home/home.jpg" className="h-full w-full object-cover object-center sm:rounded-lg" />
        </div>

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">
                Bienvenue dans l'atlas des Royaumes oubliés
          </h1>

          <div className="mt-6">
                <p className="text-lg text-gray-50 text-justify">
                  Le Sanctuaire vous permet d'accèder à toutes les connaissances nécessaires à la création d'un personnage.
                </p>
                <p className="text-lg text-gray-50 text-justify">
                Pour rechercher rapidement une connaissance, n'hésitez pas à vous servir de la loupe magique !
                </p>
                <p className="text-lg text-gray-50 text-justify">
                Si à la lecture de toutes ces connaissances il vous prend l'envie de devenir un aventurier, n'hésitez pas à vous enregistrer pour accèder à notre forgeur de héros créé par le non moins célèbre mage Reactus Javascriptus.
                </p>
          </div>
          <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>
        </div>

      </div>

      <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 mt-16">

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-50">
            Le forgeur de héros
          </h1>

          <div className="mt-6">
                <p className="text-lg text-gray-50 text-justify">
                  Notre outil vous a tapé dans l'oeil ?
                </p>
                <p className="text-lg text-gray-50 text-justify">
                Rentrez le nom de votre personnage. Ensuite choisissez dans les menus déroulants :
                <ul>
                  <li>- La Race</li>
                  <li>- La Classe</li>
                  <li>- Le Background</li>
                  <li>- L'alignement</li>
                </ul>
                Vous voilà presque au bout de votre création.
                </p>
                <p className="text-lg text-gray-50 text-justify">
                Il est temps de rentrer vos valeurs de caractéristiques obtenues en fonction de la méthode choisie. Vous verrez affiché dans les encadrés verts les bonus de la race que vous avez choisie. Et dans le rouge votre total comprenant la valeur entrée ainsi que votre bonus de race.
                </p>
                <p className="text-lg text-gray-50 text-justify">
                Pour déterminer vos valeurs de caractéristiques il existe deux méthodes :
                <ul>
                  <li>- La série pré-définie : 15, 14, 13, 12, 10, 8. Vous pouvez utiliser ces valeurs et les placer selon votre personnage dans les 6 caractéristiques. S'ajouteront ensuite les bonus de race pour donner la valeur finale à chaque caractéristique.</li>
                  <li>- Le jet de dés : Lancez 4d6 et notez la somme des trois meilleurs dés. Faites cinq autres lancers pour obtenir ainsi six nombres. Ces six nombres seront ensuite à placer dans vos différentes caractéristiques en fonction de votre personnage.</li>
                </ul>  
                </p>
                <p className="text-lg text-gray-50 text-justify">
                Il ne vous reste alors plus qu'à valider et votre personnage de niveau 1 sera créé. Vous pourrez ensuite lui ajouter toutes les informations complémentaires en créant des notes personnalisées.
                </p>
          </div>

        </div>

        <div className="flex flex-col-reverse m-2">
          <img src="../images/home/forge.png" className="h-full w-full object-cover object-center sm:rounded-lg" />
        </div>

        <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

      </div>

    </main></div>
    )} 

  export default HomePage;