import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Llaves} from '../config/llaves';
import {Usuarios} from '../models/usuarios.model';
import {UsuariosRepository} from '../repositories';

const jwt = require('jsonwebtoken');
const generador = require('password-generator');
const cryptoJS = require('crypto-js');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    /* Add @inject to inject parameters */
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) {}

  /*
   * Add service methods here
   */

  generarClave() {
    const clave = generador(8, false);
    return clave;
  }

  cifrarClave(clave: string) {
    const claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  identificarPersona(usuario: string, clave: string) {
    try {
      const p = this.usuariosRepository.findOne({
        where: {Usuario: usuario, Contrasena: clave},
      });
      if (p != null) {
        return p;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  generarTokenJWT(usuario: Usuarios) {
    const token = jwt.sign(
      {
        data: {
          id: usuario.Id,
          correo: usuario.Usuario,
          nombre: usuario.Contrasena,
        },
      },
      Llaves.claveJWT,
    );
    return token;
  }

  validarTokenJWT(token: string) {
    try {
      const datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }
}
