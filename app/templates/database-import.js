A common use of mysqldump is for making a backup of an entire database:

shell> mysqldump db_name > backup-file.sql
You can load the dump file back into the server like this:

UNIX

shell> mysql db_name < backup-file.sql
Same in Windows comand prompt

mysql -p -u[user] [database] < backup-file.sql
PowerShell

C:\> cmd.exe /c "mysql -u root -p db_name < backup-file.sql"
MySQL command line

mysql> use db_name;
mysql> source backup-file.sql;