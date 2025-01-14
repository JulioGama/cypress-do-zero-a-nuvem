describe('Aplicação CAC-TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  });
  it('Visitando a Aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Gama')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone').type('16999999999')
    cy.get('#open-text-area').type('Lorem Ipsun Test')
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  });

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('Lorem Ipsun Test ', 10)

    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Gama')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone').type('16999999999')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.success').should('be.visible')
  });

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('Lorem Ipsun Test ', 10)

    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Gama')
    cy.get('#email').type('teste@teste')
    cy.get('#phone').type('16999999999')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  });

  it('Valida se no Campo Telefone continuar vazio quando preenchido com valor não númerico', () => {
    cy.get('#phone')
      .type('abc')
      .should('have.value', '')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('Lorem Ipsun Test ', 10)

    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Gama')
    cy.get('#email').type('teste@teste')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#phone-checkbox')
      .check()
    cy.get('#phone').should('have.value','')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').type('Julio').should('have.value','Julio')
    cy.get('#firstName').clear().should('have.value','')
    cy.get('#lastName').type('Gama').should('have.value','Gama')
    cy.get('#lastName').clear().should('have.value','')
    cy.get('#email').type('teste@teste.com.br').should('have.value','teste@teste.com.br')
    cy.get('#email').clear().should('have.value', '')
    cy.get('#phone').type('16999999999').should('have.value','16999999999')
    cy.get('#phone').clear().should('have.value','')
  });

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  });

  it('envia o formuário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Julio',
      lastName: 'Gama',
      email: 'TESTE@TESTE.COM.BR',
      phone: '16999999999',
      text: 'Mensagem Teste '
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  });

  it('Validando pelo Cy.contains', () => {
    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Gama')
    cy.get('#email').type('teste@teste.com.br')
    cy.get('#phone').type('16999999999')
    cy.get('#open-text-area').type('Lorem Ipsum Test')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  });

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value','youtube')
  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria').should('have.value','mentoria')
  });

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type=radio][value=feedback]').check().should('be.checked')
  });

  it('marca o tipo de atendimento "Atendimento"', () => {
    cy.get('input[type=radio][value=feedback]').check().should('be.checked')
    cy.get('input[type=radio][value=elogio]').check().should('be.checked')
    cy.get('input[type=radio][value=ajuda]').check().should('be.checked')
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=radio]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')  
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type=checkbox]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    const longText = Cypress._.repeat('Lorem Ipsun Test ', 10)

    cy.get('#firstName').type('Julio')
    cy.get('#lastName').type('Gama')
    cy.get('#email').type('teste@teste')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('#phone-checkbox')
      .check()
    cy.get('#phone').should('have.value','')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type=file]')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type=file]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    });
    
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type=file]')
      .selectFile('@sampleFile', { action: 'drag-drop' })
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    });

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
      cy.get('#privacy > a').should('have.attr', 'target', '_blank')
    });

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
      cy.get('#privacy > a').invoke('removeAttr','target').click()
      cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    });
  });