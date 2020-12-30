use test;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
	UserID varchar(101) NOT NULL,
	Password varchar(12) NOT NULL,
	IsAdmin boolean default false,
	Color varchar(10) NOT NULL,
	Nickname varchar(21) ,
	PRIMARY KEY (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Board;
CREATE TABLE Board (
	# BoardID tinyint(100) NOT NULL AUTO_INCREMENT,
	BoardName varchar(255) NOT NULL UNIQUE,
	UserID varchar(101) NOT NULL,
	Rule mediumtext ,
	TopArticleID bigint(255) ,
	# PRIMARY KEY (BoardID),
	PRIMARY KEY (BoardName),
	FOREIGN KEY (UserID) REFERENCES Users (UserID) 
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Article;
CREATE TABLE Article (
	ArticleID bigint(255) NOT NULL AUTO_INCREMENT,
	AuthorID varchar(101) NOT NULL,
	Title varchar(255) NOT NULL,
	Content text ,
	Image longblob ,
	HashTag varchar(255) ,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	BlockName varchar(255) NOT NULL,
PRIMARY KEY (ArticleID),
FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
FOREIGN KEY (BlockName) REFERENCES Board (BoardName) ON UPDATE CASCADE  ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Report;
CREATE TABLE Report (
	UserID varchar(101) NOT NULL,
	ArticleID bigint(255) NOT NULL,
	Reason varchar(255) NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (UserID, ArticleID),
	FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID) ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Comments;
CREATE TABLE Comments (
	AuthorID varchar(101) NOT NULL,
	Content mediumtext NOT NULL,
	ArticleID bigint(255) NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	Floor int(255) NOT NULL,
	#TagFloor int(255),
	PRIMARY KEY (ArticleID, Floor),
FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)  ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Calendar;
CREATE TABLE Calendar (
	UserID varchar(101) NOT NULL,
	Title varchar(255) NOT NULL,
    Start varchar(101) NOT NULL,
    END varchar(101) NOT NULL,
    Text text,
    PRIMARY KEY (UserID, Title),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
)	CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS FollowHeart;
CREATE TABLE FollowHeart (
	ArticleID bigint(255) NOT NULL,
	UserID varchar(101) NOT NULL,
	PRIMARY KEY (ArticleID, UserID),
	FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)  ON DELETE CASCADE,
	FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS FollowKeep;
CREATE TABLE FollowKeep (
	ArticleID bigint(255) NOT NULL,
	UserID varchar(101) NOT NULL,
	DirName varchar(255) NOT NULL,
	AddTime datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (ArticleID, UserID),
	FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)   ON DELETE CASCADE,
	FOREIGN KEY (UserID, DirName) REFERENCES KeepDir (UserID, DirName)	ON UPDATE CASCADE ON DELETE CASCADE
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Notice;
CREATE TABLE Notice (
	UserID varchar(101) NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	Content varchar(255) NOT NULL,
	PRIMARY KEY (UserID, Times, Content),
	FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS KeepDir;
CREATE TABLE KeepDir (
	UserID varchar(101) NOT NULL,
	DirName varchar(255) NOT NULL,
	PRIMARY KEY (UserID, DirName),
	FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

DROP TABLE IF EXISTS Calendars;
CREATE TABLE Calendars (
	ID bigint(255) NOT NULL AUTO_INCREMENT,
	UserID varchar(101) NOT NULL,
	Title varchar(255) NOT NULL,
    Start varchar(101) NOT NULL,
    END varchar(101) NOT NULL,
    Text text,
    IsValid boolean default false,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
)	CHARSET=utf8mb4 ;


# 總愛心數
DROP VIEW IF EXISTS HomeHeart;
CREATE VIEW HomeHeart (`BoardName`,`ArticleID`,`Title`,`Content`,`cntHeart`,`Times`, `AuthorID`) AS 
SELECT `BoardName`,Article.ArticleID,`Title`,`Content`,COUNT(FollowHeart.UserID),`Times`, `AuthorID`
FROM `Article` JOIN `Board` ON Article.BlockName = Board.BoardName LEFT JOIN `FollowHeart` ON Article.ArticleID = FollowHeart.ArticleID
GROUP BY `ArticleID` ;

# 總收藏數
DROP VIEW IF EXISTS HomeKeep;
CREATE VIEW HomeKeep (`BoardName`,`ArticleID`,`Title`,`Content`,`cntKeep`,`Times`, `AuthorID`) AS 
SELECT `BoardName`,Article.ArticleID,`Title`,`Content`,COUNT(FollowKeep.UserID),`Times`, `AuthorID`
FROM `Article` JOIN `Board` ON Article.BlockName = Board.BoardName LEFT JOIN `FollowKeep` ON Article.ArticleID = FollowKeep.ArticleID
GROUP BY `ArticleID` ;

# 總留言數
DROP  VIEW IF EXISTS HomeComment;
CREATE VIEW HomeComment (`ArticleID`, `cntComment`) AS
SELECT `ArticleID`, COUNT(Comments.Content)
FROM `Article`  LEFT JOIN `Comments` USING (ArticleID)  
GROUP BY `ArticleID`;
