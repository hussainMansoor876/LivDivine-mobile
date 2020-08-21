import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TextInput, ImageBackground } from 'react-native';
import { Rating } from 'react-native-elements'
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, removeUser } from '../../Redux/actions/authActions';
import { LoginForm, SocialLogin } from '../../Components'
import { loginStyles, homeStyles } from '../../styles'


const dummyImage = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEhUSEhIVFRUXFRcVFRUVFxUYFxUVFRcWGBUXFRcYHSggGBolGxUVITEhJSorLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0gICYtLSstLy0tLS0tLS0tLS4rLS0tMi0tLS0tLS0rLSsrLS0tLS0rLS0tLS0tLS4tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYBB//EAD0QAAECAwMJBwEHBAMBAQAAAAEAAgMRIQQxUQUSEzJBYXGBkQYUIqGxwfDRI0JSYnLh8TOCkrJDc6I0B//EABoBAQACAwEAAAAAAAAAAAAAAAACBQEDBAb/xAAsEQACAQMDAgQHAAMAAAAAAAAAAQIDBBESITFBcQUjMlETIjNhgbHwocHR/9oADAMBAAIRAxEAPwD3FV1p1ijTuxUqFDDgCRMlAJsNx4rtu1Rx9im7QcwybRFndnmTqiU0AzA1hxVkmIkINBIEiLlF07sUA2VYWXVHzajQNwUaNELSQDIDYgFW68cEmxa3L6Jm0W+HDYXxTPY0bTuAWTylll8UkDwM/C0mZH5jt9Fz1riFLnd+x0UbedXjZe5qcqZegwgW52e6okysuJuCzdo7QRDqANH+R86KnQq6pd1JcPHYsadpTjys9yZFypHdfFfyMvIKK55N5J4klJQudyb5Z0qKXCFNcRcSOCfZlCK26I//ACJHQqMhE2uA4p8oubFl2K0guk8CuB6j6LR2LtDBiUcdGfzXf5XdZLFQhRLW+F3Uj1z3Oapa05dMdjavNTxU6yao5rD2HKD4JpVu1rruWC0tkyo2KPAc2V7TeMeI3qxo3MKm3DK6tbSp78onW/7vP2Tdk1uqcs/jnnVldzS47A0TaJFdJzj0W48CqxOtjOJAJvMlL7u3BAKhao4BQ7ZrcguPjOBIBoDIJ+AwOE3VKATYdvL3Ttr1Ty9U1aPBLNpO9IgvLjJxmMEAwhWHd24IQDfcxifJIMcs8IFyc743A+X1TboBf4hKRxQHWN0lTSVKIezR1Fdlfm5DHaOhrOtF179JQU21+b0AkWgu8JArRL7mMT5JtsAt8RlIVone+NwPl9UA13s4BQsr29kJmeavdqtGIpM4BOZQIgsMRxEhs2km4BYi1Wl0Vxc41PkNgG5cl1cfDWFyddrb/EeXwctNodEcXPMz6bhgE0hCqG292XCSSwgQhCAEIQgBKY2ZSU/CbILAYtCEIRBKhvLSC0yIuISUJwYNXkfKweJXP+8NhAuLforJsUxPCacNywkN5aQ4GRFQVr8kWsRGaTDwuaLwfora1uNa0y5/ZV3VvoeqPH6J5swFZmleib74cAnDaQaSNabNqb7o7Eef0XacY4LMHVma16pDohh+EV4pYtIbSRpTZsSHwzEOcLt6A6z7W+ksN/8AC66EIfiFZY71xn2WtWeG7jxXXxQ8ZonM47kAjvhwCEd0diPP6IQDWhdgVLgxA0AEyOCfVdadYoB20jOM21psXLMM0zdQSlVOWG48V23ao4+xQHYsQEEAzJUTQuwKIGsOKXly26GC5wv1W/qN3S/koykoptkoxcmkjKdp8o6aJmtPgZQb3fePsqZCFQzm5ycmX8IKEVFAhCFEkCEIQAhC6BNAKhtmU+uNEl1YIsEIQgBCEIAUvJtrMJ85+E0dwx5X9VEQpRk4tNEZRUlhm4ZCMwZUmDPcpunbiFVdnrZpIBadZgLTw+75U5Javqc1OKkiinBwk4sefCcSSAakqRZ3hok4yKdhao4BQ7ZrcgpkRy0+OWbWV8kiAwtMyJDFLsG3l7p216p5eqAVp24hCrV1AE1YWfVCO7tw9VGixS0kAyAuuQHbbeOCLFrHh7hLgNzxN1dnySI7QwTbQzly5oB6Pqngsd2oj1Yz+4+g91pocVziATMG+5Y/tK4G0PAuEm+QPqVyXssU8e512Uc1c+xVoQhVBcAhCEAIQhACfhskkwmbSnVgw2CEIQwCFJFjIGc/wDA6xOAH1UYpgwmmCF1rSTIAkm4C9XOT8kS8UTk3648FKMXLgjOaitymc0iUxeJjeMVxX2XoE2B/4TLkaeslQpKOl4EJ6lktOzkWUbN/F6tqPLOW0kvPrBEzYrDg4eZl7rY94dj6K0sZZg17Mrb2OJp+6ExDU8T6qZZNXmhkBpAJFSJm/amYzywyaZBdpxirds5+ybsusOfonLP4551ZXc+CXGhhgm0SKAfkuqu7w7HyC6gHO+HAJQgZ/inKab7o7d5/ROsjhgzTOYwQCXO0VBWdaoa/SUNNtPm9ciN0lW7KVRDZo6u4U+bkAo2cN8U7qrAZUfnRohxe71XoDo4cM0TmcV5zHM3OP5j6qvv3tFFh4et5MbQhCrSzBCU2GTcCeAKfZYIrrobuYl6pgw2kRk7Dh7SrCBkaJe7NHOfopsLI4+84nhRZ0sg6sV1KdOwbO9+q0nfs6mivoVhhtuaOJr6qSBNSVM1Ot7FPAyQfvulub9SphZDgNzpS2YuJwmU9bLS2EJuqdjRef23qnECLaHZ0qbCaNAwGKk0o7Lkim5byexHtVpdEMzyGwBPWPJz4ldVv4j7DareyZKYyp8TsTcOAU9FT6yEq6W0SNZLEyEPCK7XG8qSuIW5LBztt7sj5RbOE/wDST0qsstbamFzHNF5aQOJCzNosj4es0gY3jqFpqrqdFBrGBgGVcK9FvxZBiV5+VvrPbGlrb9Uei6/D36l2NF+vS+4d5LaSup0SmwtJ4jTYkGzE1Eq16pbIghjNN+5WRXHHfZXVnju/lcEXSeEiU/ZdifaauzHf/C4yEWHOMpDDegFdzGJQld7bvQgHdM38Q6qHGYS4kAkYhMKxs2qEA1ZTmg51K7V21EOEm1rs5pu3XjguWLWPD3CAQ1pbUg0qsBZ4Ze5rdriB1Xo2VXSgxD+R3oV55YogZEY43BwJ4Ktv380UWVgvlkzVQrOxoADRIbhP+UsMGA6JSFzEshNCE6wUWUskW8Hlfa7tba4driQ4UTMZDcGhoDSHEAEl0wZ1PovRcjWk2iBCjES0kNryMCQCZc1kO0/YGJabS6NCisa2IQXh05tMpEtlrXClLytxk+yNgQmQm3MY1g3holNbpacLBHI8GBD5y8Mp77hyXUKBjJFhZPaDnOm92LvYXBS1xCJYMtt8nIjs0E4AnovIsn9urY60se6JOG6IAYWa0NDXGUhtBAN89i9dc0EEG4iR5rzqxf8A5u9lpa4xWmA14eL88gGYaRcLgJzxotkHHfJg9HKELi1gFx7Q4EETBvC6hAZW2wNG9zcDTgahafJzCYUMgHUb6BZzK0QOiuIuEh0v85rW9nnTs8PgR0cQp2W1SSJ3m9OLf9sTGRGgAEi5RrQ0uMwJjEJqLrHifVTLHq8yrQrRuy+GedS6/ml2h4c2QMzgEi3bOfsmrJrDn6IBOidgeiFZIQHM0YKvtB8RXe8ux8gpEOEHAEiZN96A5Y6gzxRbKASx9ikR3Zhk2gvx9UQXF5k6olPCvLigKvKzyIMSv3T5091jFuO08NrbM+QkSWi8/iHtNYdVV8/MXYtrBeW39yzsGVzDGa4ZwF1ajdvCvbLHERoeAQDjfQyWPWlyG+cIDAkec/dc0G+DbWgksosE6y5NJ1ly2o5pClxCRHjBgzjcpEBaFFgW9jqTzTv+qlBDLTXIIXVGj21jNszgKoEs8EhdTNmtAiCY5g7E6hhoEIQgExoga0uNwBJluVJa8slwkwZu838pXK0ym+UJ/CXWnusutVSTWyOijBNZYLSZCd9iK7Xeqza1PZSG10J0xdEON2a391ssn5v4MXi8v8l7CAkOAUO1mTuSHR3AkA0BkLtiegsDxN1T8wVwVImxVnPd7py1CTTy9U3H+zlm0nftu4pMKIXnNcZj5ggGM44rin92Zh5ldQDXc9/kuafM8Mpy2pzvbd6ZfBLjnC4oBQbpa3Sogs0Vb9nv7LsJ2jo7bWiIr9IJNvvr83oCl7VWnOgylLxt9CsgtR2thlrGA7XegP1WXVPePzWXNkvKBWeQ7WGOzTc7yds63dFWIXKng6ZR1LBtUpjlQZPyxIBsSZGx15548VdQorXibSCNy3qWTinBx5JSZtUARG5s5bQd6Ux6WtnJq4KKNYXt2TGIqmJkYjyWlXCFHSbFV9zNlxNJkp2DZHuuaeJoFfgLqaQ6vsiNYrLoxKcyb/2UhCFI1N5BC5EeGibiAMTRVNtywLof+Ru5BYckuSUYOXAjLtqmRDGyruOwfNyqEIXLKWXk7oR0rALQ9lrRmiIJTq0+R+izyuuzDC5zwMAfM/Vb7R4rL+6Gm6XlP+6ml7rnVnfXquGLo/DKe1LbaGgSM6U6JuJDLznC7erspjo+13S53/wgwtH4pzls40RC+z1tt0t38pUSKHjNF+/cgEd83eaEnujtyEA1o3fhPQqbAeA0AkA4FPKutOsUA5ahnEZtabK+iLKM0zNKbaYJyw3Hiu27VHH2KAzfbaICYQBnR5p/ZL0KzCuu1DvGwflPmf2VKqS6easi7tVijH+6ghCFoOgEqHELTNpIOIokoQFrZstvFHjOGNx+hV7ZrSHAEXETkb6rGrR2P+mz9I9FshJnPVpxLhCgMikXFOi1HALbqRzOmyUhRTajgEgxXO/aiakNDJbogH0VLactOOoM3eanpcPNWTWSB4LMBa5yaN1KnF8i4sVzzNxJO9IQhaTpBCEIAVz2UiSjGZkDDPk5v7qmU/IZ+2HB3p+y3W7xVj3NNdZpy7GpewkmQN52FSbM4NbImRwNE7C1RwCh2zW5BXpSDlr8Us2t91fRN2dpDgSCBiaJywbeXunbXqnl6oBelb+IdQhVi6gO55xPVToDQWiYR3VuHmVHiRS05ouCA7azIiVKbEWQzNa028kuC3SCbqyoiM0QxNtDOXzogMj2uI7xIbGNHqfcKkVl2hiF1oeT+X/UKtVDWeaku7L6gsU49kCEIJletZuSyCE7ZLM6LqCcrzcBxJVtZ8hfjdyb9T9FnSyE5KGzKVjSTICZK0sFma0DAAdFIs9kZD1Wgb9vUp3NGAWxRwc86uoiroaSpOaMAlLOCGoYbBxTzRJdQskW8nCsxGhFji03j02FahNxoDXiTmg+o4HYsSjknCekzCFbx8kD7jpbjUdVW2uzOhCbxIYioWrQzojJS2Q0hJY8GoM0pR4JNY5BTshGVoh8SOrSoKkZPdKLDP52+slOm8TT+6IVFmDX2NfEcZmpvKlWUTbWvFdbAaRMipqeaZivLDJty9AUIq2UlKl93JN2YzcJ14pyD9pPOrK7Zf8AwlRYYYM5t6AfzBgOiFB7y7HyXUA53z8vn+yNBn+Kcp7E33V3wp+HGDRmm8IBGdoqXzrgjP0vhu247vdcit0hm3ZREFhYZu4c/gQGFyz/AF4m3xEdKKEn7e/OixDi9x/9FRY0TNaSvPy+abx1Z6KlHZRX2ORYsqbVFc4m9cmhd0Kagi3p0owWxc9mLVmxCwmjxT9QqPKa1a88Y4gggyIqDgQtzk22iMwPF9zhg76beahVj1KzxGjiXxF15JSEIWorAQhCAEIQgBCEIAWc7V2nVhD9bvRvv5K9tdobCYXuuA6nYBvKw1qjmI9z3XuM+GAG4LZTjl5LDw+jqnrfC/Y21xFRRTbPa50d1+qgoW2dNSW5bVKUZrcuUuCfE39Q9QolhjZ7eFPp5J8qvacZYKicHFuLN/3rNpK6l+HJGi0ninLZK+5NCA51Rtr1T8KIGDNdevQnnRP9LfPld/KNNpPDKU9t91URvtNXZfz/AISYcMsOcbkAruf5vL90JzvTfgXUA5pBiOqgx2kuJAJ4JpWFm1QgG7IZAzpXbRFrcCKVrOlaSKbt144JlrpNecGOPksN4WTKWXgwDjUqLbz4QMSpIULKJuHEqjorM0eot1moiPCfs+fP2Tyi/Pnkn4T50+fLl3lohal5Nt7oDs4VB1m7CPY71EQsNZMSipLD4N9ZLU2K0OYZjzBwI2FPLBWO2PhOzmGWI2EYELS2HtBDfR/gdidU8Ds5rRKm1wUlxYzg8x3X+S4QkscCJggjEVCUtZwghC4TKpuxQHUiNFaxpc4gAXkqutuXIUOgOe7Bt3N30ms1b8oRIxm802NFw5KcabZ20LKdR5eyHssZUMd1KMGqPc7/AEVchC6EsF3CEYR0x4BNRX7OvzklxHSUcn58+UWSTLHJDquHA+qsiqnJbpPliD88irZcFwvnKu6WKhv8nxQYUMzGo3b+UJu0ibpivBV2Sz9kz9I8lcWPV5lXVN5in9jzM1iTX3G7HSc6XX0xTlpcC0gGZpdxTdu2c/ZNWTWHP0UyAjRnA9CuK0QgEaNuA6BQo7iHEAkDcV3vTt3RPMghwzjeUAWQZwM6121SbfDGZKUgaGVJggzFFyK7RmTdtaohO0hk66/51QGatHZ1t7ImaKnxVAA3hYO029r3TE5SkDjXBewW2xNdDe2viaW37CJH1Xm9u7ERmVhPY8YGbXe4PULklbwi9UUXfht3FN/Flv0yUzXg3H6/X5vSwfnz5eo1sybGg/1IT2jEg5v+QomGRnC4qPPBfKaayi4Y6YXVCsVoJMiNnopqwbEwQhCGRcKM5lWuLTuJHopjMsxx/wAh5gH1CgIWGkyEqcJepJlg/LUc/wDIeQaPQKJGtD36z3O4klNIRJIxGlCPpSX4BCELJsBcJkuqLbY+bIAb0MM6500l7wLzL4fnRQnR3Hb0S7LYosUyhw3v/S0kczcOazgg5JbslQbe1jg6RMsN/FbnJuSmxWMiZ82uaHANEqHEnbyWbyf2JtESWe5kMHElzugp5r0bJWR2WeCyECXZolM0mSSSZbKlSjQhN6pLJR+JXUGl8OXzdcexJsdlYxjWtaJAba31vKatJIdIGQ3UQ60OBkLhTonYUMPGc69dSSSwiiby8sTZPFOdbr64py0tAaSBI0qOKbi/Z6u2+e7+UmHELzmm5ZMDOkdiepQpndW7+qEA33P83l+6NPmeGU5bU73puPkVHiQi4lwuNyAXm6Wt0qYozNF4r9mG/wBl2C7RiTqbcURnB4k2pnP51QHO8Z/hlKdJpuPZc1pM9mC6yCWkEigvTsaM1zSJ3jAqM1mLRmLw0VSrbZkKzRdaE0HFvhP/AJv5qzc0gyN64qjLRaRm47xeDH5R7LsgAxYcR0m/dcAbyBRwljgqtbPtD/8AO/8At/2asYt9OTa3LyxqSnTbk87/APAQhC2HaCEIQAhCEAIQhACsMm9nW2oaR8QtaDm5rQJm4zmbr8FXrVdlP6Tv+w/6tUJtpbHJezlClmLwO2Ps7ZoV0IOOL/F5GnkrQCVBQYBdQudtvkoZTlLeTyTbJBm3OncbuFU93z8vmk2Z4DM2dTPqUjuzsPMK2pJqCTKybzJjvdc6s763Yo0uj8Mp7Z3XpxsdoABNRQ0OxMxWF5m2oUyIr+rulzv/AIRodH4pzlsuvoiD9nPOpO7bdwSosQPGa29AJ75+XzQmu7Ow8wuoBlWFm1QhCAj268cEWLWPD3CEICTaNU8FWrqEA7lLZ8wUFCFV3H1Gd1H0Iru0P/zv/t/2asYhCzS4PQeG/Sff/SBCELaWAIQhACEIQAhCEALV9lf6Lv8AsP8Aq1CFrqek4fEPo/lFynYO35ghChR+ojz9X0Meh3jiPVWaEK1K8rIuseJ9VMserzKEIBu3bOfsmrJrDn6LqEBPQhCA/9k='

const Home = (props) => {
    const user = useSelector(state => state.authReducer.user);
    const dispatch = useDispatch();
    return (
        <SafeAreaView style={loginStyles.setFlex}>
            <ScrollView style={loginStyles.setFlex}>
                <View style={homeStyles.viewStyles}>
                    <TextInput
                        style={homeStyles.textInputStyle}
                        underlineColorAndroid="transparent"
                        placeholder="Search"
                    />
                </View>
                <View style={homeStyles.viewStyle}>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.image}
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.image}
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                    <View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.image}
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View><View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.image}
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View><View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.image}
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View><View style={homeStyles.childStyle}>
                        <ImageBackground
                            style={homeStyles.image}
                            style={homeStyles.tile}
                            source={{ uri: dummyImage }}
                        >
                            <Text style={homeStyles.name}>Yasir Khan</Text>
                            <Text style={homeStyles.ctgry}>Love & Career</Text>
                            <Rating imageSize={13} style={homeStyles.rating} ></Rating>
                            <Text style={{ marginLeft: -60, marginTop: 170, flexDirection: 'row' }}>1,123</Text>
                            <Text style={{ marginLeft: -45, marginTop: 185, flexDirection: 'row' }}>Readings</Text>
                            <Text style={{ marginLeft: 30, marginTop: 170, flexDirection: 'row' }}>2020</Text>
                            <Text style={{ marginLeft: -35, marginTop: 185, flexDirection: 'row' }}>Year joined</Text>
                        </ImageBackground>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
