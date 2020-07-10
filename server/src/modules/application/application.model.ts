import { Entity, BaseEntity, PrimaryColumn, Column, ManyToOne, AfterInsert, AfterUpdate, AfterRemove } from 'typeorm';
import { Game } from '../game/game.model';
import wsService from '../ws/ws.service';

@Entity()
export class Application extends BaseEntity {
    @PrimaryColumn()
    id!: number;

    @Column()
    username!: string;

    @Column({ type: 'simple-json' })
    preferences!: any;

    @Column()
    message!: string;


    @ManyToOne(() => Game, game => game.id, { nullable: false, onDelete: 'CASCADE' })
    game!: Game;


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    private afterChange() {
        wsService.updateAdminState();
    }
}
