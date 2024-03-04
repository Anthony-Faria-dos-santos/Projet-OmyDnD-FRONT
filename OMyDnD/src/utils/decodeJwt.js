import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
    try {
        const decodedToken = jwtDecode(token); // Décodage du token.
        const currentTime = Date.now() / 1000; // Récupération de l'heure actuelle.

        if (decodedToken.exp < currentTime) { // Vérification de la validité du token.
            console.log('Token expiré');
            return null;
        }

        return decodedToken;             // Retourne le token décodé.
    } catch (error) {
        console.error('Erreur lors du décodage du token', error);
        return null;
    }
};
