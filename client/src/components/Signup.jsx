export default function Signup() {

    const [formState, setFormState] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(CREATE_USER); // Will need to change to match schema

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder="Your name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
                <input
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    placeholder="Your password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <button
                    style={{ cursor: 'pointer' }}
                    type="submit"
                >
                    Create
                </button>
            </form>
        </>
    )
}