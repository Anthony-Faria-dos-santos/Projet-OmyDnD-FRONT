import { Link } from "react-router-dom";

function Legals() {

  return (
    <div className="bg-gray-900">
      <main className="pb-10 mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 mt-4 text-center">

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-50">
              Mentions légales
            </h1>

            <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

            <div className="mt-6">
              <h2 className="text-3xl font-bold tracking-tight text-gray-50">
                Identité et coordonnées de l&apos;éditeur : 
              </h2>

                <p className="text-lg text-gray-50">
                  Ce site est édité par l&apos;équipe de développement O&apos;MyDnD.
                </p>

                <p className="text-lg text-gray-50">
                  <Link to="/contact" target="_blank">Contact</Link>
                </p>

                <p className="text-lg text-gray-50">
                  <strong>
                    Reponsables de la publication :
                  </strong>
                    <ul>
                      <li>
                        Trehou Lavediot Thomas
                      </li>
                      <li>
                        Faria Dos Santos Anthony
                      </li>
                    </ul> 
                </p>

                <p className="text-lg text-gray-50">
                  <strong>
                    Equipe de développement :
                  </strong>
                    <ul>
                      <li>
                        Bréchaire Guillaume, Développeur FullStack
                      </li>
                      <li>
                        Carlucci Mickael, Développeur FullStack
                      </li>
                      <li>
                        Faria Dos Santos Anthony, Développeur FullStack
                      </li>
                      <li>
                        Oliveira Catarina, Développeuse FullStack
                      </li>
                      <li>
                        Trehou Lavediot Thomas, Développeur FullStack
                      </li>
                    </ul> 
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>
            </div>

          </div>

            <div className="mt-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-50">
                Identité et coordonnées de l&apos;hébergeur : 
              </h2>

                <p className="text-lg text-gray-50">
                  Heroku
                </p>

                <p className="text-lg text-gray-50">
                415 Mission Street Suite 300 San Francisco, CA 94105
                </p>

                <p className="text-lg text-gray-50">
                  Contact : <Link to="https://www.heroku.com/contact" target="_blank">https://www.heroku.com/contact</Link>
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>
            </div>

            <div className="mt-6 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-50">
                Données personnelles & RGPD : 
              </h2>

              <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-50">
                  Objet du traitement (finalité et base légale)
                </h3>

                <p className="text-lg text-gray-50">
                  Le site Atlasdd, dont les coordonnées sont disponibles ci-dessus, collecte et traite des données personnelles afin de permettre et de gérer une connexion personnalisée à chaque utilisateur. La collecte et le traitement des données effectué par le site Atlasdd a pour base légale les <Link to="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre2#Article6" target="_blank">articles 6.1</Link> du Réglement Européen pour la Protection des Données (RGPD).
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-50">
                  Catégories de données
                </h3>

                <p className="text-lg text-gray-50">
                  Les données à caractère personnel collectées sont les suivantes :
                  <ul>
                    <li>Données d’identification (adresse électronique (email), code interne de traitement permettant l&apos;identification de l&apos;utilisateur)</li>
                    <li>Données de connexion (logs)</li>
                  </ul>
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-50">
                  Conditions de la collecte et durée de conservation des données
                </h3>

                <p className="text-lg text-gray-50">
                  Les données à caractère personnel sont collectés dans les cas suivants, et pour les durées indiquées : Identité, dès la création d&apos;un compte utilisateur sur le site, et jusqu&apos;à ce que le-dit compte utilisateur soit supprimé.
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-50">
                  Destinataires des données
                </h3>

                <p className="text-lg text-gray-50">
                  Les développeurs du site Atlasdd sont destinataires de l&apos;ensemble des catégories de données à caractère personnel collectées. Les données collectées ne sont en aucun cas transmises à des tiers.
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-50">Vos droits
                </h3>

                <p className="text-lg text-gray-50">
                  Conformément aux <Link to="https://www.cnil.fr/fr/reglement-europeen-protection-donnees/chapitre3#Article16" target="_blank">articles 16, 17, 18 et 20 du Réglement Européen pour la Protection des Données (RGPD)</Link>, toute personne concernée par la collecte et le traitement de données effectué par le site Atlasdd peut exercer ses droits :
                  <ul>
                    <li>
                      <strong>Droit de rectification :</strong> les données personnelles peuvent être rectifiées sur simple demande via la page <Link to="/contact" target="_blank">contact</Link> ou directement depuis l&apos;espace membre du site.
                    </li>

                    <li>
                      <strong>Droit de rectification :</strong> les données personnelles peuvent être rectifiées sur simple demande via la page <Link to="/contact" target="_blank">contact</Link> ou directement depuis l&apos;espace membre du site.
                    </li>

                    <li>
                      <strong>Droit à l&apos;effacement (droit à l&apos;oubli) :</strong> les données personnelles peuvent être définitivement effacées sur simple demande via la page <Link to="/contact" target="_blank">contact</Link> ou directement depuis l&apos;espace membre du site.
                    </li>

                    <li>
                      <strong>Droit à la limitation du traitement des données :</strong> sur simple demande via la page <Link to="/contact" target="_blank">contact</Link>, vous pouvez limiter certains traitements effectués sur vos données.
                    </li>

                    <li>
                      <strong>Droit à la portabilité des données :</strong> sur simple demande via la page <Link to="/contact" target="_blank">contact</Link> ou directement depuis l&apos;espace membre du site, toutes les données à caractère personnel concernant un utilisateur lui seront transmises au format PDF.
                    </li>
                  </ul>
                </p>

                <div className="mt-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900 w-full h-1"></div>

                <h3 className="text-2xl font-bold tracking-tight text-gray-50">
                  Délégué à la Protection des Données (DPO) & Responsable du traitement
                </h3>

                <p className="text-lg text-gray-50">
                  Tout utilisateur du site Atlasdd peut accéder aux données le concernant, les rectifier ou les faire effacer. Les utilisateurs disposent également d&apos;un droit à la portabilité et d’un droit à la limitation du traitement des données (consultez le site <Link to="https://www.cnil.fr/fr" target="_blank">cnil.fr</Link> pour plus d’informations sur vos droits). Pour exercer ces droits ou pour toute question sur le traitement de vos données dans ce dispositif, vous pouvez contacter notre DPO : <Link to="/contact" target="_blank">contact</Link>
                </p>

            </div>

      </main>
    </div>
  )
}

export default Legals;