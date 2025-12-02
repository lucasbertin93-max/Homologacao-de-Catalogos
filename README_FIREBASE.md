# Guia de Uso - Integração Firebase

## Funcionalidades Implementadas

### 1. Salvamento Automático
- Os dados do checklist são salvos automaticamente no Firebase Firestore
- O salvamento ocorre 2 segundos após qualquer alteração (status ou observação)
- Não é necessário clicar em "Salvar" manualmente, mas o botão está disponível

### 2. Homologações Anteriores
- Ao abrir a aplicação, você verá uma lista de homologações anteriores (se houver)
- Clique em qualquer homologação para carregar seus dados
- A lista mostra: nome da campanha, data e última atualização

### 3. Botão Salvar Manual
- Disponível na tela do checklist
- Útil para forçar um salvamento imediato
- Mostra feedback visual ("Salvando..." → "Salvo!")

## Como Usar

### Criar Nova Homologação
1. Preencha o nome da campanha
2. Selecione a data
3. Clique em "Iniciar Checklist"
4. Preencha os itens conforme necessário
5. Os dados serão salvos automaticamente

### Continuar Homologação Anterior
1. Na tela inicial, procure a seção "Homologações Anteriores"
2. Clique na homologação desejada
3. Todos os dados serão carregados automaticamente
4. Continue de onde parou

### Gerar PDF
- O botão "Gerar Resumo em PDF" continua funcionando normalmente
- Gera um PDF com todos os dados preenchidos

## Estrutura de Dados no Firebase

### Coleção: `homologations`

Cada documento contém:
```json
{
  "campaignName": "Nome da Campanha",
  "homologationDate": "2025-12-02",
  "lastUpdated": "2025-12-02T19:42:00.000Z",
  "items": [
    {
      "index": 0,
      "category": "Pré-homologação",
      "description": "1. Criar usuário teste.",
      "status": "Ok",
      "observation": "Usuário criado com sucesso"
    }
  ]
}
```

## Configuração do Firebase

O Firebase já está configurado com as seguintes credenciais:
- **Projeto**: homologacaodecatalogos
- **Região**: Firestore configurado
- **SDK**: Firebase v10.7.1 (via CDN)

## Solução de Problemas

### Dados não estão sendo salvos
1. Abra o Console do navegador (F12)
2. Verifique se há erros no console
3. Confirme que o Firebase está inicializado (deve aparecer mensagem no console)

### Homologações anteriores não aparecem
1. Aguarde 1-2 segundos após carregar a página
2. Verifique se há dados no Firebase Console
3. Confirme que a coleção `homologations` existe

### Erro de permissão
- Verifique as regras de segurança do Firestore no Firebase Console
- As regras devem permitir leitura e escrita (pelo menos em desenvolvimento)

## Regras de Segurança Recomendadas (Firebase Console)

Para desenvolvimento:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /homologations/{document=**} {
      allow read, write: if true;
    }
  }
}
```

Para produção (com autenticação):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /homologations/{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```
