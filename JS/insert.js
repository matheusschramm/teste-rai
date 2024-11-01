
     // Inicialize o cliente Supabase
     const SUPABASE_URL = 'https://junnzyyfvrscsprmtden.supabase.co';
     const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1bm56eXlmdnJzY3Nwcm10ZGVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAwMzY3NDgsImV4cCI6MjAyNTYxMjc0OH0.0klro7_-4-y5FimxzLkRFLvEA5Ssl4LxHoeBpDRj_IY';
     const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        // Captura os valores dos campos
        const file = document.getElementById('file').files[0];
        const itemName = document.getElementById('item-name').value;
        const location = document.getElementById('localizacao').value;
        const description = document.getElementById('descricao').value;
        const quantity = document.getElementById('quantidade').value;

        // Verifica se todos os campos estão preenchidos
        if (file && itemName && location && description && quantity) {

            try {

                const uuid = crypto.randomUUID();
                const nomeImagemUnica = `${itemName}-${uuid}`;
                // Upload da imagem
                const { data: imageData, error: imageError } = await supabaseClient.storage
                  .from('imagens')
                  .upload(`${nomeImagemUnica}`, file);

                if (imageError) {
                    console.error('Erro ao fazer upload da imagem:', imageError.message);
                    return;
                }
                
                console.log('Imagem carregada com sucesso:', imageData);

                // Inserir os dados no banco de dados
                const { data, error: dbError } = await supabaseClient
                  .from('Itens_racho')
                  .insert([{
                      nome: itemName,
                      localizacao: location,
                      descricao: description,
                      quantidade: quantity,  // Converte quantidade para número
                      image_path: imageData.path
                  }]);

                if (dbError) {
                    console.error('Erro ao salvar dados no banco de dados:', dbError.message);
                } else {
                    console.log('Dados salvos com sucesso!', data);
                }

                if (dbError) throw new Error(dbError.message); 
            } catch (error) {
                console.error('Erro inesperado:', error);
            }
        } else {
            console.error('Por favor, preencha todos os campos.');
        }
    });

//    teste select:
