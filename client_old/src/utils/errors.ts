export function translate(message: string){
  switch(message){
    case "No user with this email": return "Aucun utilisateur avec cet email";
    case "Invalid password": return "Mot de passe incorrect";
    case "User already exists": return "Email déjà existante";
    case "Invalid credentials": return "Identifiants invalide";
    case "Request failed with status code 404": return "Aucun compte minecraft avec ce pseudo";
    case "Minecraft account already used": return "Compte minecraft déjà assigné";
    case "Not enought gems": return "Pas assez de gemmes";
    default: return message;
  }
}
