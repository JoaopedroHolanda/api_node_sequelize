class Controller {
    constructor(entidadeService){
        this.entidadeService = entidadeService
    }

    async pegaTodos(req,res){
        try{
            const listaDeRegistros = await this.entidadeService.pegaTodosOsRegistros()
            return res.status(200).json(listaDeRegistros)
        }catch(erro){
            res.status(400).json({message : erro})
        }
    }

    async pegaUmPorId(req,res){
        const {id} = req.body
        try{
            const umRegsitro = await this.entidadeService.pegaUmRegistroPorId(Number(id))
            return res.status(200).json(umRegsitro)
        }catch(erro){
            res.status(400).json({message : erro})
        }
       
    }

    async criaNovo(req,res){
        const dadosParaCriacao = req.body
        try{
            const novoRegistroCriado = await this.entidadeService.criaRegistro(dadosParaCriacao)
            return res.status(200).json(novoRegistroCriado)
        }catch(erro){
            res.status(400).json({message : erro})
        }
    }

    async exclui(req,res){
        const {id} = req.params
        try{    
            await this.entidadeService.excluiRegistro(Number(id))
            return res.status(200).json({mensagem: `id ${id} deletado`})
        }catch(erro){
            res.status(400).json({message : erro})
        }
    }

    async atualiza(req, res) {
        const { id } = req.params;
        const dadosAtualizados = req.body;
        try {
          const foiAtualizado = await this.entidadeService.atualizaRegistro(dadosAtualizados, Number(id))
          if (!foiAtualizado) {
            return res.status(400).json({ mensagem: 'registro não foi atualizado' })
          }
          return res.status(200).json({ mensagem: 'Atualizado com sucesso' })
        } catch (erro) {
            res.status(400).json({message : erro})
        }
      }

}

module.exports = Controller