import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidIdException extends HttpException {
  constructor() {
    super('ID inválido fornecido.', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidEmailException extends HttpException {
  constructor() {
    super('Email inválido fornecido.', HttpStatus.BAD_REQUEST);
  }
}

export class AdminNotFoundException extends HttpException {
  constructor() {
    super('Administrador não encontrado.', HttpStatus.NOT_FOUND);
  }
}
