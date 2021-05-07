echo '\n\n Listando todos os heroes'
curl localhost:3000/heroes

echo '\n\n Listando hero com ID'
curl localhost:3000/heroes/1

echo '\n\n Fazendo request com um dado invalido'
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
    localhost:3000/heroes


echo '\n\n Criando outro hero'
curl --silent -X POST \
    --data-binary '{"name": "MagaMan", "age":2, "power": "Fire"}' \
    localhost:3000/heroes
