-- Trigger to assign user role when create user
CREATE TRIGGER trg_assignUserRole on Users after insert as
begin
	declare @roleId as INT,@userID as INT;
	set @roleId = (select id from Roles where displayName = 'user');
	set @userID = (select id from inserted)
	insert into User_Roles(roleId,userId, createdAt, updatedAt) values(@roleID, @userID,GETDATE() ,GETDATE())

END

