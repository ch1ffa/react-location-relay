# React-location-relay example

This repository uses server example from [graphql-workshop](https://github.com/ChilliCream/graphql-workshop) repo via submodule:

```bash
git clone https://github.com/ch1ffa/react-location-relay.git --recursive
```

To build server container:

```bash
docker build server/graphql-workshop/code/complete/GraphQL -t gql-workshop
```

To run server:

```bash
docker run -d -p 8080:80 gql-workshop
```

To run webapp:

```bash
npm install
```

```bash
npm start
```
