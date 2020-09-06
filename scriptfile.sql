select * from bithday_bug

select * from cloud_gfx.gfxdata_jalwa where  clipid='9XRS5760' ;
channelid = '75306f87-af2e-4ba3-bf24-f46976de0848' and

CREATE TABLE `users` (
	`UID` CHAR(40) NOT NULL,
	`Name` VARCHAR(50) NOT NULL,
	`Username` VARCHAR(50) NOT NULL,
	`Password` VARCHAR(50) NOT NULL,
	`Remarks` VARCHAR(100) NULL DEFAULT NULL,
	`IsActive` TINYINT(1) NOT NULL,
	`IsDeleted` TINYINT(1) NOT NULL,
	`IsEditRight` TINYINT(1) NULL DEFAULT NULL,
	`DateCreated` DATETIME NOT NULL,
	`LastUpdated` DATETIME NOT NULL,
	`CreatedBy` CHAR(40) NOT NULL,
	`UpdatedBy` CHAR(40) NOT NULL,
	`RoleID` VARCHAR(50) NULL DEFAULT NULL,
	`ConsumerKey` VARCHAR(50) NOT NULL,
	`emailid` VARCHAR(155) NULL DEFAULT NULL,
	`primarymobile` TINYTEXT NULL,
	`secondarymobile` TINYTEXT NULL,
	`twitterhandle` VARCHAR(200) NULL DEFAULT NULL,
	`address` VARCHAR(355) NULL DEFAULT NULL,
	`GroupId` VARCHAR(40) NULL DEFAULT NULL,
	`services` VARCHAR(40) NULL DEFAULT NULL,
	`CPMSUrl` VARCHAR(100) NULL DEFAULT NULL,
	`readtime` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	`Session_id` VARCHAR(200) NULL DEFAULT NULL,
	`IsLogin` VARCHAR(5) NULL DEFAULT NULL,
	`SessionTime` DATETIME NULL DEFAULT NULL,
	`timezone` VARCHAR(50) NULL DEFAULT NULL,
	PRIMARY KEY (`UID`) USING BTREE
)
COMMENT='This table contains all the users credentials.'
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;


Create Table Team
(
	`TeamId` INT(40) NOT NULL AUTO_INCREMENT,
	`Identifier` VARCHAR(50) NOT NULL,
	`Name` CHAR(40) NOT NULL,
	`LogoURI` VARCHAR(500) NOT NULL,
	`TeamStatus`  bool,
	 PRIMARY KEY (TeamId)
	)
	COMMENT='This table contains all the Team info'
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

Insert into Team
(Identifier,Name,LogoURI,TeamStatus)
Values('Ind','India','https://www.pngitem.com/pimgs/m/160-1606077_bcci-logo-indian-cricket-board-logo-hd-png.png',1)


Insert into Team
(Identifier,Name,LogoURI,TeamStatus)
Values('pak','Pakistan','https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/PakistancricketBoard-logo.svg/1200px-PakistancricketBoard-logo.svg.png',0)


Create Table StructureofPlayers
(
	`TeamPlayerId` INT(40) NOT NULL AUTO_INCREMENT,
	`TeamId` INT(40) NOT NULL,
	`Identifier` VARCHAR(50) NOT NULL,
	`FirstName` CHAR(40) NOT NULL,
	`LastName` CHAR(40) NOT NULL,
	`ImageURI` VARCHAR(500) NOT NULL,
	`JersyNumer`  INT(40),
	`PLayerTotmat`  INT(40),
	 `PlayerTotrun`  INT(40),
	`Playerhighscore`  INT(40),
	 `Playerfifty`  INT(40),
	 `Playerhundred`  INT(40),
	 PRIMARY KEY (TeamPlayerId),
	 FOREIGN KEY (TeamId) REFERENCES Team(TeamId)
)
	COMMENT='This table contains all the Team Player info'
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;


Insert into StructureofPlayers(TeamId,Identifier,FirstName,LastName,JersyNumer,PLayerTotmat,PlayerTotrun,Playerhighscore,Playerfifty,Playerhundred)
Values(1,'Cap','Mahendra Singh','Dhoni','1','100','1000','100','200','100');

Insert into StructureofPlayers(TeamId,Identifier,FirstName,LastName,JersyNumer,PLayerTotmat,PlayerTotrun,Playerhighscore,Playerfifty,Playerhundred)
Values(1,'Vi Cap','Virat','Kohli','18','100','1000','100','200','50');



Insert into StructureofPlayers(TeamId,Identifier,FirstName,LastName,JersyNumer,PLayerTotmat,PlayerTotrun,Playerhighscore,Playerfifty,Playerhundred)
Values(1,'BatsMan','Rohit','Sharma','45','100','1000','100','200','50');




Insert into StructureofPlayers(TeamId,Identifier,FirstName,LastName,JersyNumer,PLayerTotmat,PlayerTotrun,Playerhighscore,Playerfifty,Playerhundred)
Values(1,'Batsman','Mohammad','AZAM','1','10','300','50','1','1');

Insert into StructureofPlayers(TeamId,Identifier,FirstName,LastName,JersyNumer,PLayerTotmat,PlayerTotrun,Playerhighscore,Playerfifty,Playerhundred)
Values(1,'Vi Cap','Haidar','Ali','2','60','500','50','3','1');



Insert into StructureofPlayers(TeamId,Identifier,FirstName,LastName,JersyNumer,PLayerTotmat,PlayerTotrun,Playerhighscore,Playerfifty,Playerhundred)
Values(1,'BatsMan','Shoaib','Malik','70','200','1000','100','3','3');