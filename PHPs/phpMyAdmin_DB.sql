CREATE TABLE Users (
	UserID varchar(255) NOT NULL,
	Password varchar(12) NOT NULL,
	IsAdmin boolean default false,
	Color varchar(10) NOT NULL,
	Nickname varchar(50) ,
	PRIMARY KEY (UserID)
) CHARSET=utf8mb4 ;

CREATE TABLE Board (
	BoardName varchar(255) NOT NULL UNIQUE,
	UserID varchar(255) NOT NULL,
	Rule mediumtext ,
	TopArticleID bigint(255) ,
	PRIMARY KEY (BoardName),
	FOREIGN KEY (UserID) REFERENCES Users (UserID) 
) CHARSET=utf8mb4 ;

CREATE TABLE Article (
	ArticleID bigint(255) NOT NULL AUTO_INCREMENT,
	AuthorID varchar(255) NOT NULL,
	Title varchar(255) NOT NULL,
	Content longtext ,
	Image longblob ,
	HashTag varchar(255) ,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	BlockName varchar(255) NOT NULL,
    PRIMARY KEY (ArticleID),
    FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
    FOREIGN KEY (BlockName) REFERENCES Board (BoardName) ON UPDATE CASCADE  ON DELETE CASCADE
) CHARSET=utf8mb4 ;

CREATE TABLE Report (
	UserID varchar(255) NOT NULL,
	ArticleID bigint(255) NOT NULL,
	Reason text NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (UserID, ArticleID),
	FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID) ON DELETE CASCADE
) CHARSET=utf8mb4 ;

CREATE TABLE Comments (
	AuthorID varchar(255) NOT NULL,
	Content mediumtext NOT NULL,
	ArticleID bigint(255) NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	Floor int(255) NOT NULL,
	#TagFloor int(255),
	PRIMARY KEY (ArticleID, Floor),
    FOREIGN KEY (AuthorID) REFERENCES Users (UserID),
    FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)  ON DELETE CASCADE
) CHARSET=utf8mb4 ;

CREATE TABLE FollowHeart (
	ArticleID bigint(255) NOT NULL,
	UserID varchar(255) NOT NULL,
	PRIMARY KEY (ArticleID, UserID),
	FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID)  ON DELETE CASCADE,
	FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

CREATE TABLE FollowKeep (
	ArticleID bigint(255) NOT NULL,
	UserID varchar(255) NOT NULL,
	DirName varchar(255) NOT NULL,
	AddTime datetime DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (ArticleID, UserID),
	FOREIGN KEY (ArticleID) REFERENCES Article (ArticleID) ON DELETE CASCADE,
	FOREIGN KEY (UserID, DirName) REFERENCES KeepDir (UserID, DirName)	ON UPDATE CASCADE ON DELETE CASCADE
) CHARSET=utf8mb4 ;

CREATE TABLE Notice (
	UserID varchar(255) NOT NULL,
	Times datetime DEFAULT CURRENT_TIMESTAMP,
	Content varchar(255) NOT NULL,
	PRIMARY KEY (UserID, Times, Content),
	FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

CREATE TABLE KeepDir (
	UserID varchar(255) NOT NULL,
	DirName varchar(255) NOT NULL,
	PRIMARY KEY (UserID, DirName),
	FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

CREATE TABLE Issue (
	UserID varchar(255) NOT NULL,
    Content longtext ,
    Times datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (UserID, Times),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
) CHARSET=utf8mb4 ;

CREATE TABLE Calendar (
	UserID varchar(255) NOT NULL,
	Title varchar(255) NOT NULL,
    Start varchar(101) NOT NULL,
    END varchar(101) NOT NULL,
    Text text,
    IsValid boolean default false,
    PRIMARY KEY (UserID, Title),
    FOREIGN KEY (UserID) REFERENCES Users (UserID)
)	CHARSET=utf8mb4 ;


# 總愛心數
CREATE VIEW HomeHeart (`BoardName`,`ArticleID`,`Title`,`Content`,`cntHeart`,`Times`, `AuthorID`) AS 
SELECT `BoardName`,Article.ArticleID,`Title`,`Content`,COUNT(FollowHeart.UserID),`Times`, `AuthorID`
FROM `Article` JOIN `Board` ON Article.BlockName = Board.BoardName LEFT JOIN `FollowHeart` ON Article.ArticleID = FollowHeart.ArticleID
GROUP BY `ArticleID` ;

# 總收藏數
CREATE VIEW HomeKeep (`BoardName`,`ArticleID`,`Title`,`Content`,`cntKeep`,`Times`, `AuthorID`) AS 
SELECT `BoardName`,Article.ArticleID,`Title`,`Content`,COUNT(FollowKeep.UserID),`Times`, `AuthorID`
FROM `Article` JOIN `Board` ON Article.BlockName = Board.BoardName LEFT JOIN `FollowKeep` ON Article.ArticleID = FollowKeep.ArticleID
GROUP BY `ArticleID` ;

# 總留言數
CREATE VIEW HomeComment (`ArticleID`, `cntComment`) AS
SELECT `ArticleID`, COUNT(Comments.Content)
FROM `Article`  LEFT JOIN `Comments` USING (ArticleID)  
GROUP BY `ArticleID`;
