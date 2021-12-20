-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3307
-- Généré le : lun. 20 déc. 2021 à 16:27
-- Version du serveur :  5.7.24
-- Version de PHP : 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mydb`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `date_pub` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `descrip` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `date_pub` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `titre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `post`
--

INSERT INTO `post` (`id`, `descrip`, `image`, `date_pub`, `user_id`, `titre`) VALUES
(2, 'l\'avion est bleu', NULL, '2021-11-16 06:39:08', 2, 'ovni'),
(3, 'Un bon soleil bleu aujourd\'hui', NULL, '2021-12-20 15:58:33', 11, 'Le soleil');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `isadmin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `image`, `description`, `isadmin`) VALUES
(1, 'jean', 'jean@jean.fr', 'jean94', NULL, NULL, 0),
(2, 'guillaume', 'guill@ume.fr', '$2b$10$AKVnz0vdPGaSO2ALMzyIJe1aTNqjU2hR0ZWBuzBa8nWGXNP5oObou', NULL, NULL, 0),
(5, 'guillaume2', 'guill@ume.com', '$2b$10$zAxe16SRc4uGI7Q40FF9DegyQfZBZT2up.aqKXC/6MktYAgyOvcGq', NULL, NULL, 0),
(6, 'guigui3', 'guigui3@lav.com', '$2b$10$aeXkMuH3O9KeUBkDcL3U7OwRJ53QORKl1ibsqYJguciT8s4dSHo9a', NULL, NULL, 0),
(8, 'test2', 'test2@test.fr', '$2b$10$slEwwlwAf0otDwrGuqNpZOYHDmZDUlHHM/Wc0gI9p/wZdBHWYt/pq', NULL, NULL, 0),
(9, 'test3', 'test3@test.fr', '$2b$10$aBiot5l4kVY1FtUS8j36L.FqgsKVtf5/xRo4I8BVExc0JTtcski5C', NULL, NULL, 0),
(10, 'Aurore', 'aurore@gmail.com', '$2b$10$QmTJOuoylCfkMJy8QuzxH.Ao7J1dLDiXLw7/IpqUnIR4oFmDOCTxu', NULL, NULL, 0),
(11, 'jean', 'jean@gmail.fr', '$2b$10$PscVjxe3xLO/OJHdLNa1d.sltv5eW15QtCD1eOnldGQVpO4wTY7eK', NULL, NULL, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_commentaires_Users1_idx` (`user_id`),
  ADD KEY `fk_commentaires_Post1_idx` (`post_id`);

--
-- Index pour la table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Post_Users_idx` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_commentaires_Post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_commentaires_Users1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Contraintes pour la table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_Post_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
