---
title: 'Formation 10'
date: '2023-03-04'
slug: 'cours10'
---

## OpenID Connect (OIDC)

- Standard pour gérer le "Single-Sign On" et le "Identity Provision".
- Fonctionne sur web / mobile / natif
- Adopté par Microsoft, Google, Oracle, SalesForce, etc


---

## Comment ça marche?

1. On doit identifier un usager
2. On dirige usager vers le OpenID Provider (redirection HTTP 302)
3. On obtient un token d'identité

---

## Token ID

Détermine l'identité de l'usager
Le token possède des données: 
- Authorité (nom du fournisseur d'identité)
- Le ID du client (programme ayant généré la requête)
- Date de création et d'expiration
- Détails de l'usager (courriel, nom, etc...)
- Signature digitale

---

## Diagramme

https://cloudentity.com/developers/basics/tokens/id-token/




