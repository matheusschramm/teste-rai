async function fetchData() {
    try {
        const { data, error } = await supabaseClient
            .from('Itens_racho')
            .select('*');

        if (error) {
            console.log('Erro ao buscar dados: ', error.message);
            return;
        }

        console.log('dados recebidos: ', data);

        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = '';

        data.forEach(item => {
            const urlImagem = `${SUPABASE_URL}/storage/v1/object/public/imagens/${item.image_path}`;
            console.log(urlImagem);

            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${item.nome}</td>
                <td>${item.localizacao}</td>
                <td>${item.descricao}</td>
                <td>${item.quantidade}</td>
                <td><img src="${urlImagem}" alt="imagem" width="50" height="50"></td>
            `;

            tableBody.appendChild(linha);
        });
    } catch (error) {
        console.log('Erro inesperado: ', error);
    }
}

const fetch = document.getElementById('fetch-data');

fetch.addEventListener('click', fetchData);