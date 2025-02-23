# Memory Album (Server)

Run the server with the following command:

```sh
dotnet run
```

## Model configuration

- [Linking model and model configuration to context](https://learn.microsoft.com/en-us/ef/core/modeling/#using-entitytypeconfigurationattribute-on-entity-types)
- [Connect MySQL to ASP.NET](https://stackoverflow.com/questions/72148071/how-to-connect-to-mysql-server-using-entity-framework-core)

## Developer notes

### Setup database

#### Migrate and update/create database

```sh
dotnet ef migrations remove
dotnet ef migrations add Initial
dotnet ef database update
```

#### Delete existing database

```sh
mysql -u root -p
show databases;
drop database memory_album;
```

### Review

```cs
return await _context.Albums
            .Include(album => album.Cover)
            .Include(album => album.Events) // FIXME: missing inherited types
            .ToListAsync();
```
