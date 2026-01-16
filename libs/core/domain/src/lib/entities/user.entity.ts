export class UserEntity {
  constructor(
    public readonly email: string,
    public readonly password?: string,
    public readonly id?: number, // Alterado para number (Int)
    public readonly name?: string | null
  ) {}
}
