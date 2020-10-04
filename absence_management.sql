-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  Dim 04 oct. 2020 à 17:05
-- Version du serveur :  10.3.16-MariaDB
-- Version de PHP :  7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `absence_management`
--

-- --------------------------------------------------------

--
-- Structure de la table `absence`
--

CREATE TABLE `absence` (
  `id` int(11) NOT NULL,
  `nbr_heures` int(5) NOT NULL,
  `Id_seance` int(20) NOT NULL,
  `Id_etudiant` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` varchar(20) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
('1', 'moharm', '123');

-- --------------------------------------------------------

--
-- Structure de la table `classe`
--

CREATE TABLE `classe` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(500) NOT NULL,
  `Anne_uv` varchar(100) NOT NULL,
  `Id_option` varchar(20) NOT NULL,
  `Num_Camera` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classe`
--

INSERT INTO `classe` (`id`, `lebelle`, `Anne_uv`, `Id_option`, `Num_Camera`) VALUES
('3', 'IRISI_3', '2019/2020', '3', 2);

-- --------------------------------------------------------

--
-- Structure de la table `classe_etudiant`
--

CREATE TABLE `classe_etudiant` (
  `id` int(11) NOT NULL,
  `id_etudiant` int(20) NOT NULL,
  `id_classe` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `classe_etudiant`
--

INSERT INTO `classe_etudiant` (`id`, `id_etudiant`, `id_classe`) VALUES
(7, 15, '3'),
(8, 14, '3'),
(9, 9, '3'),
(10, 13, '3'),
(11, 8, '3'),
(12, 12, '3'),
(13, 11, '3'),
(14, 10, '3'),
(15, 16, '3');

-- --------------------------------------------------------

--
-- Structure de la table `class_prof_ele`
--

CREATE TABLE `class_prof_ele` (
  `Id_professeur` varchar(20) NOT NULL,
  `id_element` varchar(20) NOT NULL,
  `id_classe` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `class_prof_ele`
--

INSERT INTO `class_prof_ele` (`Id_professeur`, `id_element`, `id_classe`) VALUES
('1', '1', '1'),
('1', '2', '3');

-- --------------------------------------------------------

--
-- Structure de la table `element`
--

CREATE TABLE `element` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(500) NOT NULL,
  `Id_module` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `element`
--

INSERT INTO `element` (`id`, `lebelle`, `Id_module`) VALUES
('1', 'java', '1'),
('2', 'c++', '2'),
('3', 'merise', '3'),
('4', 'UML', '4'),
('5', 'communication_francais', '5'),
('6', 'communication_anglais', '6');

-- --------------------------------------------------------

--
-- Structure de la table `etudiant`
--

CREATE TABLE `etudiant` (
  `id` int(20) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `prenom` varchar(200) NOT NULL,
  `username` varchar(300) NOT NULL,
  `password` varchar(5000) NOT NULL,
  `email` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `etudiant`
--

INSERT INTO `etudiant` (`id`, `nom`, `prenom`, `username`, `password`, `email`) VALUES
(7, 'kross', 'Toni', 'toni', '123', 'dfvdfvd'),
(8, 'COURTOIS', 'COURTOIS', 'COURTOIS', '123', 'afew'),
(9, 'CARVAJAL', 'CARVAJAL', 'CARVAJAL', '123', 'efewf'),
(10, 'VARANE', 'VARANE', 'VARANE', '123', 'fbdfbdf'),
(11, 'RAMOS', 'RAMOS', 'RAMOS', '123', 'efwefwef'),
(12, 'MARCELO', 'MARCELO', 'MARCELO', '1223', 'fwe'),
(13, 'CASEMIRO', 'CASEMIRO', 'CASEMIRO', '123', 'wfwef'),
(14, 'BENZEMA', 'BENZEMA', 'BENZEMA', '123', 'dwvvew'),
(15, 'BALE', 'BALE', 'BALE', '123', 'wrge'),
(16, 'james', 'james', 'james', '123', 'kskdmslk');

-- --------------------------------------------------------

--
-- Structure de la table `filiere`
--

CREATE TABLE `filiere` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(500) NOT NULL,
  `date_lancement` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `filiere`
--

INSERT INTO `filiere` (`id`, `lebelle`, `date_lancement`) VALUES
('1', 'IRISI', '2019-07-01'),
('2', 'SIR', '2019-07-01'),
('3', 'SCIENCES DES DONNEES ET AIDE A LA DECISION', '2019-07-01');

-- --------------------------------------------------------

--
-- Structure de la table `module`
--

CREATE TABLE `module` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `module`
--

INSERT INTO `module` (`id`, `lebelle`) VALUES
('1', 'java'),
('2', 'c++'),
('3', 'merise'),
('4', 'UML'),
('5', 'communication'),
('6', 'programmation mobile'),
('7', 'administration de base de données'),
('8', 'systèmes d\'exploitation');

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

CREATE TABLE `niveau` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`id`, `lebelle`) VALUES
('1', 'L1'),
('2', 'L2'),
('3', 'L3'),
('4', 'M1'),
('5', 'M2'),
('6', 'C1'),
('7', 'C2'),
('8', 'C3');

-- --------------------------------------------------------

--
-- Structure de la table `option_module_semestre`
--

CREATE TABLE `option_module_semestre` (
  `id_option` varchar(20) NOT NULL,
  `id_module` varchar(20) NOT NULL,
  `id_semestre` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `option_module_semestre`
--

INSERT INTO `option_module_semestre` (`id_option`, `id_module`, `id_semestre`) VALUES
('1', '1', '1'),
('1', '2', '2'),
('2', '3', '1'),
('2', '4', '2'),
('3', '6', '4'),
('3', '8', '2'),
('3', '7', '2');

-- --------------------------------------------------------

--
-- Structure de la table `professeur`
--

CREATE TABLE `professeur` (
  `id` varchar(20) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `username` varchar(500) NOT NULL,
  `password` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `professeur`
--

INSERT INTO `professeur` (`id`, `nom`, `prenom`, `username`, `password`) VALUES
('1', 'bencharf', 'omar', 'omar', '123');

-- --------------------------------------------------------

--
-- Structure de la table `seance`
--

CREATE TABLE `seance` (
  `id` int(20) NOT NULL,
  `date_creation` datetime NOT NULL,
  `debut` time NOT NULL,
  `fin` time NOT NULL,
  `Id_professeur` varchar(20) NOT NULL,
  `Id_element` varchar(20) NOT NULL,
  `id_classe` varchar(20) NOT NULL,
  `Image_path` varchar(2000) NOT NULL,
  `date_seance` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `semestre`
--

CREATE TABLE `semestre` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `semestre`
--

INSERT INTO `semestre` (`id`, `lebelle`) VALUES
('1', 'S1'),
('2', 'S2'),
('3', 'S3'),
('4', 'S4'),
('5', 'S5'),
('6', 'S6');

-- --------------------------------------------------------

--
-- Structure de la table `_option`
--

CREATE TABLE `_option` (
  `id` varchar(20) NOT NULL,
  `lebelle` varchar(500) NOT NULL,
  `Id_niveau` varchar(20) NOT NULL,
  `Id_filiere` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `_option`
--

INSERT INTO `_option` (`id`, `lebelle`, `Id_niveau`, `Id_filiere`) VALUES
('1', 'IRISI_1', '6', '1'),
('2', 'IRISI_2', '7', '1'),
('3', 'IRISI_3', '8', '1'),
('4', 'SIR', '3', '2'),
('5', 'SCIENCES DES DONNEES ET AIDE A LA DECISION_1', '4', '3'),
('6', 'SCIENCES DES DONNEES ET AIDE A LA DECISION_2', '5', '3');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `absence`
--
ALTER TABLE `absence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id_seance` (`Id_seance`),
  ADD KEY `Id_etudiant` (`Id_etudiant`);

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `classe`
--
ALTER TABLE `classe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id_option` (`Id_option`);

--
-- Index pour la table `classe_etudiant`
--
ALTER TABLE `classe_etudiant`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_classe` (`id_classe`),
  ADD KEY `id_etudiant` (`id_etudiant`);

--
-- Index pour la table `class_prof_ele`
--
ALTER TABLE `class_prof_ele`
  ADD KEY `id_element` (`id_element`),
  ADD KEY `Id_professeur` (`Id_professeur`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `element`
--
ALTER TABLE `element`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id_module` (`Id_module`);

--
-- Index pour la table `etudiant`
--
ALTER TABLE `etudiant`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `filiere`
--
ALTER TABLE `filiere`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `module`
--
ALTER TABLE `module`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `option_module_semestre`
--
ALTER TABLE `option_module_semestre`
  ADD KEY `id_module` (`id_module`),
  ADD KEY `id_option` (`id_option`),
  ADD KEY `id_semestre` (`id_semestre`);

--
-- Index pour la table `professeur`
--
ALTER TABLE `professeur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `seance`
--
ALTER TABLE `seance`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id_professeur` (`Id_professeur`),
  ADD KEY `Id_element` (`Id_element`),
  ADD KEY `id_classe` (`id_classe`);

--
-- Index pour la table `semestre`
--
ALTER TABLE `semestre`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `_option`
--
ALTER TABLE `_option`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Id_filiere` (`Id_filiere`),
  ADD KEY `Id_niveau` (`Id_niveau`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `absence`
--
ALTER TABLE `absence`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;

--
-- AUTO_INCREMENT pour la table `classe_etudiant`
--
ALTER TABLE `classe_etudiant`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `etudiant`
--
ALTER TABLE `etudiant`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `seance`
--
ALTER TABLE `seance`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=206;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `absence`
--
ALTER TABLE `absence`
  ADD CONSTRAINT `absence_ibfk_3` FOREIGN KEY (`Id_seance`) REFERENCES `seance` (`id`),
  ADD CONSTRAINT `absence_ibfk_4` FOREIGN KEY (`Id_etudiant`) REFERENCES `classe_etudiant` (`id`);

--
-- Contraintes pour la table `classe`
--
ALTER TABLE `classe`
  ADD CONSTRAINT `classe_ibfk_1` FOREIGN KEY (`Id_option`) REFERENCES `_option` (`id`);

--
-- Contraintes pour la table `classe_etudiant`
--
ALTER TABLE `classe_etudiant`
  ADD CONSTRAINT `classe_etudiant_ibfk_1` FOREIGN KEY (`id_classe`) REFERENCES `classe` (`id`),
  ADD CONSTRAINT `classe_etudiant_ibfk_2` FOREIGN KEY (`id_etudiant`) REFERENCES `etudiant` (`id`);

--
-- Contraintes pour la table `class_prof_ele`
--
ALTER TABLE `class_prof_ele`
  ADD CONSTRAINT `class_prof_ele_ibfk_1` FOREIGN KEY (`id_element`) REFERENCES `element` (`id`),
  ADD CONSTRAINT `class_prof_ele_ibfk_2` FOREIGN KEY (`Id_professeur`) REFERENCES `professeur` (`id`),
  ADD CONSTRAINT `class_prof_ele_ibfk_3` FOREIGN KEY (`id_classe`) REFERENCES `classe` (`id`);

--
-- Contraintes pour la table `element`
--
ALTER TABLE `element`
  ADD CONSTRAINT `element_ibfk_1` FOREIGN KEY (`Id_module`) REFERENCES `module` (`id`);

--
-- Contraintes pour la table `option_module_semestre`
--
ALTER TABLE `option_module_semestre`
  ADD CONSTRAINT `option_module_semestre_ibfk_1` FOREIGN KEY (`id_module`) REFERENCES `module` (`id`),
  ADD CONSTRAINT `option_module_semestre_ibfk_2` FOREIGN KEY (`id_option`) REFERENCES `_option` (`id`),
  ADD CONSTRAINT `option_module_semestre_ibfk_3` FOREIGN KEY (`id_semestre`) REFERENCES `semestre` (`id`);

--
-- Contraintes pour la table `seance`
--
ALTER TABLE `seance`
  ADD CONSTRAINT `seance_ibfk_1` FOREIGN KEY (`Id_professeur`) REFERENCES `professeur` (`id`),
  ADD CONSTRAINT `seance_ibfk_2` FOREIGN KEY (`Id_element`) REFERENCES `element` (`id`),
  ADD CONSTRAINT `seance_ibfk_3` FOREIGN KEY (`id_classe`) REFERENCES `classe` (`id`);

--
-- Contraintes pour la table `_option`
--
ALTER TABLE `_option`
  ADD CONSTRAINT `_option_ibfk_1` FOREIGN KEY (`Id_filiere`) REFERENCES `filiere` (`id`),
  ADD CONSTRAINT `_option_ibfk_2` FOREIGN KEY (`Id_niveau`) REFERENCES `niveau` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
