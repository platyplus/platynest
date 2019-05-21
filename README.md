# platynest

## Create a data object module

1. Create the module and review the depencendies
2. Add the Entity class to ENTITIES in the config service
3. Import the module in the application module

## Conventions

### Entity types

Annotations order:

1. TypeOrm
2. Type-graphql annotations second
3. Serialization options e.g. @Expose(), Exlude()

### Input types

Don't forget:

- @IsNotEmpty() for mandatory fields - it has to be explicit. Weird
- @IsOptional() for optional fields
