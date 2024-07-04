class Store {
    // User management
 
    static setUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static getUser() {
        const userJson = localStorage.getItem('user');
        if (userJson === null) return null;
        return JSON.parse(userJson);
    }

    static clearUser() {
        localStorage.removeItem('user');
    }
    static getViolations() {
        return JSON.parse(localStorage.getItem('violations') || '[]');
    }

    static verifyViolation(id) {
        let violations = Store.getViolations();
        violations = violations.map(violation => 
            violation.id === id ? { ...violation, verified: true } : violation
        );
        localStorage.setItem('violations', JSON.stringify(violations));
    }

    static dismissViolation(id) {
        let violations = Store.getViolations();
        violations = violations.filter(violation => violation.id !== id);
        localStorage.setItem('violations', JSON.stringify(violations));
    }
    // Traffic light settings management
    static initExampleIntersections() {
        if (!localStorage.getItem('intersections')) {
            const exampleIntersections = [
                { number: 1, location: 'Intersection 1', currentCondition: 'Medium', settings: 'Medium' },
                { number: 2, location: 'Intersection 2', currentCondition: 'High', settings: 'High' }
            ];
            localStorage.setItem('intersections', JSON.stringify(exampleIntersections));
        }
    }

    static getIntersections() {
        return JSON.parse(localStorage.getItem('intersections') || '[]');
    }

    static setTrafficSetting(intersectionNumber, setting) {
        let intersections = Store.getIntersections();
        intersections = intersections.map(intersection => 
            intersection.number === intersectionNumber ? { ...intersection, settings: setting } : intersection
        );
        localStorage.setItem('intersections', JSON.stringify(intersections));}


    static initExampleViolations() {
        if (!localStorage.getItem('violations')) {
            const exampleViolations = [
                { id: '1', registrationNumber: 'ABC123', videoUrl: 'http://example.com/video1', timestamp: '2024-06-01 12:34', verified: false },
                { id: '2', registrationNumber: 'XYZ456', videoUrl: 'http://example.com/video2', timestamp: '2024-06-02 13:45', verified: false }
            ];
            localStorage.setItem('violations', JSON.stringify(exampleViolations));
        }
    }
  
}
