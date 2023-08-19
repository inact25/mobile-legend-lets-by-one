import './App.css'
import {Avatar, Button, Card, Checkbox, Col, Input, Modal, Row} from "antd";
import {heroList, lastUpdates} from "./constant/herolist";
import {useEffect, useState} from "react";
import Loader from "./assets/loader.gif"
import Logos from "./assets/logos.jpg"

interface Hero {
    hero_id: number
    hero_name: string
    hero_banner: string
    hero_avatar: string
    hero_role: string
    hero_specially: string
}

function App() {


    const [mustDifferent, setMustDiferent] = useState(false)
    const [heroBattle, setHeroBattle] = useState<Hero[]>([]);
    const [open, setOpen] = useState(false)
    const [countdown, setCountdown] = useState<number>(0); // Set initial countdown time in seconds

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const getBattleHero = (array: Hero[], count: number) => {
        setCountdown(4.5)
        const randomObjects: Hero[] = [];

        if (count >= array.length) {
            return array; // Return all objects if count is greater or equal to array length
        }

        while (randomObjects.length < count) {
            const randomIndex = Math.floor(Math.random() * array.length);
            const randomObject = array[randomIndex];

            if (!mustDifferent && !randomObjects.includes(randomObject)) {
                randomObjects.push(randomObject);
            } else {
                randomObjects.push(randomObject);
            }
        }

        setHeroBattle(randomObjects)
    }


    useEffect(() => {
        const intervalId = setInterval(() => {
            if (countdown > 0) {
                setCountdown(prevCountdown => prevCountdown - 0.5);
            }
        }, 500);

        return () => {
            clearInterval(intervalId);
        };
    }, [countdown]);

    return (
        <>
            <Row gutter={24} justify='center' align='middle' style={{marginBottom: "3rem"}}>
                <Col span={10}>
                    <Input size='large' style={{marginBottom: "2rem", padding: "1rem", fontWeight: 700}}
                           placeholder="Masukkan Nama Pemain"/>
                    {heroBattle[0] &&
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src={countdown !== 0 ? Loader : heroBattle[0]?.hero_banner}
                                />
                            }
                        >
                            <Card.Meta
                                avatar={<Avatar src={countdown !== 0 ? Logos : heroBattle[0]?.hero_avatar}/>}
                                title={<span style={{
                                    fontSize: 18,
                                    fontWeight: "600"
                                }}>{countdown !== 0 ? "randomize heroes..." : heroBattle[0]?.hero_name}</span>}
                                style={{textAlign: "start"}}
                            />
                        </Card>
                    }

                </Col>
                <Col span={4}>
                    <div style={{fontSize: 38, fontWeight: "bold"}}>VS</div>
                    <div>
                        <Button type="primary" shape="round" style={{
                            paddingTop: ".75rem",
                            paddingBottom: "2rem",
                            fontWeight: "bold",
                            marginTop: "3rem"
                        }} onClick={() => showModal()} block>Pengaturan</Button>
                    </div>
                </Col>
                <Col span={10}>
                    <Input size='large' style={{marginBottom: "2rem", padding: "1rem", fontWeight: 700}}
                           placeholder="Masukkan Nama Pemain"/>
                    {heroBattle[1] &&
                        <Card
                            cover={
                                <img
                                    alt="example"
                                    src={countdown !== 0 ? Loader : heroBattle[1]?.hero_banner}
                                />
                            }
                        >
                            <Card.Meta
                                avatar={<Avatar src={countdown !== 0 ? Logos : heroBattle[1]?.hero_avatar}/>}
                                title={<span style={{
                                    fontSize: 18,
                                    fontWeight: "600"
                                }}>{countdown !== 0 ? "randomize heroes..." : heroBattle[1]?.hero_name}</span>}
                                style={{textAlign: "start"}}
                            />
                        </Card>
                    }
                </Col>
            </Row>
            <Row style={{marginBottom: "3rem"}} gutter={[8, 8]} justify={'center'}>
                {heroList.map(item =>
                    <Col key={item.hero_id}>
                        <Avatar size='large' src={item.hero_avatar}/>
                    </Col>
                )}
            </Row>
            <Row style={{marginBottom: "1rem"}}>
                <Button type="primary" shape="round"
                        style={{paddingTop: "1.25rem", paddingBottom: "2.5rem", fontWeight: "bold"}} block
                        onClick={() => getBattleHero(heroList, 2)}>Let's By One</Button>
            </Row>
            <Row style={{marginBottom: "1rem"}} justify='center'>
                Last Update: {lastUpdates}
            </Row>

            <Modal
                title="Pengaturan"
                open={open}
                onOk={hideModal}
                onCancel={hideModal}
                cancelButtonProps={{style: {display: "none"}}}
            >
                <Row style={{marginTop: "2rem"}}>
                    <Col span={24}>
                        <Checkbox checked={mustDifferent} onChange={e => setMustDiferent(e.target.checked)}>Player 1 and
                            Player 2 Hero Cant be Same</Checkbox>
                    </Col>
                </Row>
            </Modal>

        </>
    )
}

export default App
